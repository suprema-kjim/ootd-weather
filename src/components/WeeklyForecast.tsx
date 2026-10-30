import type { DailyWeather } from "../types";
import { getWeatherInfo } from "../utils/weatherCode";

interface Props {
  week: DailyWeather[];
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function formatDayLabel(dateStr: string, index: number): string {
  if (index === 0) return "오늘";
  const date = new Date(`${dateStr}T00:00:00`);
  return `${date.getMonth() + 1}/${date.getDate()} (${WEEKDAYS[date.getDay()]})`;
}

export function WeeklyForecast({ week }: Props) {
  return (
    <section className="section-card">
      <h2 className="section-title">일주일 날씨</h2>
      <ul className="week-list">
        {week.map((day, index) => {
          const { label, icon } = getWeatherInfo(day.weatherCode);
          return (
            <li key={day.date} className="week-row">
              <span className="week-day">{formatDayLabel(day.date, index)}</span>
              <span className="week-icon" aria-hidden="true">
                {icon}
              </span>
              <span className="week-condition">{label}</span>
              <span className="week-rain">{day.precipitationProbability}%</span>
              <span className="week-temp">
                <span className="week-temp-max">{Math.round(day.tempMax)}°</span>
                {" / "}
                <span className="week-temp-min">{Math.round(day.tempMin)}°</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
