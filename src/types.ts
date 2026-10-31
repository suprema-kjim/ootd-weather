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
  today: DailyWeather;
  todayHourly: HourlyPoint[]; // today's 00/03/06/09/12/15/18/21h snapshots, in time order
  week: DailyWeather[]; // today + next 6 days (7 entries)
  fetchedAt: string;
}
