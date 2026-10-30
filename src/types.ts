export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
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

export interface WeatherData {
  current: CurrentWeather;
  yesterday: DailyWeather;
  today: DailyWeather;
  week: DailyWeather[]; // today + next 6 days (7 entries)
  fetchedAt: string;
}
