import type { DailyWeather } from "../types";
import { getWeatherInfo } from "../utils/weatherCode";

interface Props {
  yesterday: DailyWeather;
}

export function YesterdayWeather({ yesterday }: Props) {
  const { label, icon } = getWeatherInfo(yesterday.weatherCode);

  return (
    <section className="section-card">
      <h2 className="section-title">어제 날씨</h2>
      <div className="yesterday-row">
        <span className="yesterday-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="yesterday-label">{label}</span>
        <span className="yesterday-temp">
          {Math.round(yesterday.tempMax)}° / {Math.round(yesterday.tempMin)}°
        </span>
        <span className="yesterday-rain">☔ {yesterday.precipitationProbability}%</span>
      </div>
    </section>
  );
}
