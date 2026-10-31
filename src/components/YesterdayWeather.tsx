import type { DailyWeather, HourlyPoint } from "../types";
import { getWeatherInfo } from "../utils/weatherCode";

interface Props {
  yesterday: DailyWeather;
  hourly: HourlyPoint[];
}

function hourLabel(iso: string): string {
  return `${parseInt(iso.slice(11, 13), 10)}시`;
}

export function YesterdayWeather({ yesterday, hourly }: Props) {
  const { label, icon } = getWeatherInfo(yesterday.weatherCode);

  return (
    <section className="section-card yesterday-card">
      <h2 className="section-title">어제 날씨</h2>

      <div className="yesterday-summary">
        <span className="yesterday-icon" aria-hidden="true">
          {icon}
        </span>
        <div>
          <p className="yesterday-label">{label}</p>
          <p className="yesterday-temp">
            {Math.round(yesterday.tempMax)}° / {Math.round(yesterday.tempMin)}°
          </p>
        </div>
      </div>

      <ul className="yesterday-hourly">
        {hourly.map((point) => {
          const info = getWeatherInfo(point.weatherCode);
          return (
            <li key={point.time}>
              <span className="hourly-time">{hourLabel(point.time)}</span>
              <span className="hourly-icon" aria-hidden="true">
                {info.icon}
              </span>
              <span className="hourly-temp">{Math.round(point.temperature)}°</span>
            </li>
          );
        })}
      </ul>

      <p className="yesterday-rain">☔ 강수확률 {yesterday.precipitationProbability}%</p>
    </section>
  );
}
