import type { CurrentWeather as CurrentWeatherData, DailyWeather } from "../types";
import { getWeatherInfo } from "../utils/weatherCode";
import { getOutfitRecommendation } from "../utils/outfit";
import { getClothingEmoji } from "../utils/clothingEmoji";
import { humidityBar, rainBar, windBar, pm10Bar, pm25Bar, uvBar } from "../utils/statBars";
import { StatBar } from "./StatBar";

interface Props {
  current: CurrentWeatherData;
  today: DailyWeather;
  yesterday: DailyWeather;
}

export function CurrentWeather({ current, today, yesterday }: Props) {
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
        <div className="current-main-primary">
          <div className="current-icon" aria-hidden="true">
            {icon}
          </div>
          <div>
            <div className="current-header">
              <p className="current-label">{label}</p>
              <p className="current-yesterday">
                어제 {Math.round(yesterday.tempMax)}° / {Math.round(yesterday.tempMin)}°
              </p>
            </div>
            <p className="current-temp">{Math.round(current.temperature)}°C</p>
            <p className="current-feels">
              체감 {Math.round(current.apparentTemperature)}°C · 최고{" "}
              {Math.round(today.tempMax)}° / 최저 {Math.round(today.tempMin)}°
            </p>
          </div>
        </div>

        <div className="current-outfit-inline">
          <p className="outfit-category">오늘의 옷차림 · {outfit.category}</p>
          <div className="outfit-items">
            {outfit.items.map((item) => (
              <span key={item} className="outfit-chip">
                <span className="icon-emoji" aria-hidden="true">
                  {getClothingEmoji(item)}
                </span>{" "}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="stat-bars">
        <StatBar icon="💧" label="습도" {...humidityBar(current.humidity)} />
        <StatBar icon="☔" label="강수확률" {...rainBar(today.precipitationProbability)} />
        <StatBar icon="💨" label="풍속" {...windBar(current.windSpeed)} />
        {current.pm10 !== undefined && (
          <StatBar icon="😷" label="미세먼지" {...pm10Bar(current.pm10)} />
        )}
        {current.pm25 !== undefined && (
          <StatBar icon="😷" label="초미세먼지" {...pm25Bar(current.pm25)} />
        )}
        <StatBar icon="☀️" label="자외선" {...uvBar(current.uvIndex)} />
      </div>

      {outfit.tips.length > 0 && (
        <ul className="outfit-tips">
          {outfit.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
