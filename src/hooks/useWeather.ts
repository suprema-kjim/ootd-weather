import { useCallback, useEffect, useRef, useState } from "react";
import { LOCATION, REFRESH_INTERVAL_MS } from "../constants";
import type { DailyWeather, HourlyPoint, WeatherData } from "../types";

/** Hours of the day sampled for the "yesterday" hourly trend strip. */
const YESTERDAY_SAMPLE_HOURS = [0, 6, 12, 18];

const API_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_API_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

function buildUrl(): string {
  const params = new URLSearchParams({
    latitude: String(LOCATION.latitude),
    longitude: String(LOCATION.longitude),
    timezone: LOCATION.timezone,
    past_days: "1",
    forecast_days: "7",
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,uv_index",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max",
    hourly: "temperature_2m,weather_code",
  });
  return `${API_URL}?${params.toString()}`;
}

function buildAirQualityUrl(): string {
  const params = new URLSearchParams({
    latitude: String(LOCATION.latitude),
    longitude: String(LOCATION.longitude),
    timezone: LOCATION.timezone,
    current: "pm10,pm2_5",
  });
  return `${AIR_QUALITY_API_URL}?${params.toString()}`;
}

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    uv_index: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

interface AirQualityResponse {
  current: {
    pm10: number;
    pm2_5: number;
  };
}

/** Air quality comes from a separate API; fetch failures here shouldn't break the rest of the page. */
async function fetchAirQuality(): Promise<AirQualityResponse["current"] | null> {
  try {
    const res = await fetch(buildAirQualityUrl());
    if (!res.ok) return null;
    const data: AirQualityResponse = await res.json();
    return data.current;
  } catch {
    return null;
  }
}

function toDailyWeather(data: OpenMeteoResponse["daily"], i: number): DailyWeather {
  return {
    date: data.time[i],
    weatherCode: data.weather_code[i],
    tempMax: data.temperature_2m_max[i],
    tempMin: data.temperature_2m_min[i],
    precipitationSum: data.precipitation_sum[i],
    precipitationProbability: data.precipitation_probability_max[i],
    windSpeedMax: data.wind_speed_10m_max[i],
  };
}

async function fetchWeather(): Promise<WeatherData> {
  const [res, airQuality] = await Promise.all([fetch(buildUrl()), fetchAirQuality()]);
  if (!res.ok) {
    throw new Error(`날씨 정보를 가져오지 못했어요. (HTTP ${res.status})`);
  }
  const data: OpenMeteoResponse = await res.json();

  // past_days=1 puts yesterday at index 0, today at index 1,
  // and forecast_days=7 appends 6 more future days after today.
  const yesterday = toDailyWeather(data.daily, 0);
  const today = toDailyWeather(data.daily, 1);
  const week = data.daily.time
    .slice(1)
    .map((_, idx) => toDailyWeather(data.daily, idx + 1));

  // Hourly data starts at midnight of the first day (yesterday), one entry
  // per hour, so indices 0-23 are yesterday's 24 hours.
  const yesterdayHourly: HourlyPoint[] = YESTERDAY_SAMPLE_HOURS.map((hour) => ({
    time: data.hourly.time[hour],
    temperature: data.hourly.temperature_2m[hour],
    weatherCode: data.hourly.weather_code[hour],
  }));

  return {
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      uvIndex: data.current.uv_index,
      pm10: airQuality?.pm10,
      pm25: airQuality?.pm2_5,
    },
    yesterday,
    yesterdayHourly,
    today,
    week,
    fetchedAt: new Date().toISOString(),
  };
}

interface UseWeatherResult {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/** Loads weather data and automatically refreshes it once an hour. */
export function useWeather(): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const load = useCallback(() => {
    const id = ++requestId.current;
    setLoading(true);
    fetchWeather()
      .then((result) => {
        if (id !== requestId.current) return;
        setData(result);
        setError(null);
      })
      .catch((err: unknown) => {
        if (id !== requestId.current) return;
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했어요.");
      })
      .finally(() => {
        if (id !== requestId.current) return;
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
    const intervalId = setInterval(load, REFRESH_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [load]);

  return { data, loading, error, refresh: load };
}
