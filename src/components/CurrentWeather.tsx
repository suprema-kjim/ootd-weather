import type { CurrentWeather as CurrentWeatherData, DailyWeather } from "../types";
import { getWeatherInfo } from "../utils/weatherCode";
import { getOutfitRecommendation } from "../utils/outfit";

interface Props {
  current: CurrentWeatherData;
  today: DailyWeather;
}

export function CurrentWeather({ current, today }: Props) {
  const { label, icon } = getWeatherInfo(current.weatherCode);
  const outfit = getOutfitRecommendation(
    current.apparentTemperature,
    current.weatherCode,
    current.windSpeed,
    today.precipitationProbability
  );

  return (
    <section className="current-card">
      <div className="current-main">
        <div className="current-icon" aria-hidden="true">
          {icon}
        </div>
        <div>
          <p className="current-label">{label}</p>
          <p className="current-temp">{Math.round(current.temperature)}°C</p>
          <p className="current-feels">
            체감 {Math.round(current.apparentTemperature)}°C · 최고{" "}
            {Math.round(today.tempMax)}° / 최저 {Math.round(today.tempMin)}°
          </p>
        </div>
      </div>

      <div className="current-stats">
        <div className="stat">
          <span className="stat-label">습도</span>
          <span className="stat-value">{current.humidity}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">강수확률</span>
          <span className="stat-value">{today.precipitationProbability}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">풍속</span>
          <span className="stat-value">{Math.round(current.windSpeed)}km/h</span>
        </div>
      </div>

      <div className="outfit-box">
        <p className="outfit-category">오늘의 옷차림 · {outfit.category}</p>
        <div className="outfit-items">
          {outfit.items.map((item) => (
            <span key={item} className="outfit-chip">
              {item}
            </span>
          ))}
        </div>
        {outfit.tips.length > 0 && (
          <ul className="outfit-tips">
            {outfit.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
