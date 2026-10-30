import type { CurrentWeather as CurrentWeatherData, DailyWeather } from "../types";
import { getWeatherInfo } from "../utils/weatherCode";
import { getOutfitRecommendation } from "../utils/outfit";
import { getClothingEmoji } from "../utils/clothingEmoji";
import { getPm10Level, getPm25Level, getUvLevel } from "../utils/airQuality";

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
    today.precipitationProbability,
    current.uvIndex,
    current.pm10,
    current.pm25
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
        {current.pm10 !== undefined && (
          <div className="stat">
            <span className="stat-label">미세먼지</span>
            <span className="stat-value">{getPm10Level(current.pm10)}</span>
          </div>
        )}
        {current.pm25 !== undefined && (
          <div className="stat">
            <span className="stat-label">초미세먼지</span>
            <span className="stat-value">{getPm25Level(current.pm25)}</span>
          </div>
        )}
        <div className="stat">
          <span className="stat-label">자외선</span>
          <span className="stat-value">
            {getUvLevel(current.uvIndex)} {Math.round(current.uvIndex)}
          </span>
        </div>
      </div>

      <div className="outfit-box">
        <p className="outfit-category">오늘의 옷차림 · {outfit.category}</p>
        <div className="outfit-items">
          {outfit.items.map((item) => (
            <span key={item} className="outfit-chip">
              <span aria-hidden="true">{getClothingEmoji(item)}</span> {item}
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
