import type { HourlyPoint } from "../types";
import { getWeatherInfo } from "../utils/weatherCode";

interface Props {
  hourly: HourlyPoint[];
}

function hourLabel(iso: string): string {
  return `${parseInt(iso.slice(11, 13), 10)}시`;
}

export function HourlyForecast({ hourly }: Props) {
  return (
    <section className="section-card">
      <h2 className="section-title">시간대별 날씨</h2>
      <ul className="hourly-list">
        {hourly.map((point) => {
          const { icon } = getWeatherInfo(point.weatherCode);
          return (
            <li key={point.time}>
              <span className="hourly-time">{hourLabel(point.time)}</span>
              <span className="hourly-icon" aria-hidden="true">
                {icon}
              </span>
              <span className="hourly-temp">{Math.round(point.temperature)}°</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
