export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  uvIndex: number;
  /** Undefined when the separate air-quality request failed. */
  pm10?: number;
  pm25?: number;
}

export interface DailyWeather {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbability: number;
  windSpeedMax: number;
}

export interface HourlyPoint {
  time: string;
  temperature: number;
  weatherCode: number;
}

export interface WeatherData {
  current: CurrentWeather;
  yesterday: DailyWeather;
  yesterdayHourly: HourlyPoint[]; // 00/06/12/18h snapshots, in time order
  today: DailyWeather;
  week: DailyWeather[]; // today + next 6 days (7 entries)
  fetchedAt: string;
}
