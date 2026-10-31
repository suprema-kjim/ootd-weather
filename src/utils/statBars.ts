import { getPm10Level, getPm25Level, getUvLevel } from "./airQuality";

export type BarLevel = "good" | "caution" | "bad";

export interface BarData {
  percent: number; // 0-100, how full the bar should render
  level: BarLevel; // drives the bar's color
  value: string; // the text shown on the right of the bar
}

function clampPercent(n: number): number {
  return Math.min(100, Math.max(0, n));
}

export function humidityBar(humidity: number): BarData {
  return {
    percent: clampPercent(humidity),
    level: humidity <= 60 ? "good" : humidity <= 80 ? "caution" : "bad",
    value: `${Math.round(humidity)}%`,
  };
}

export function rainBar(probability: number): BarData {
  return {
    percent: clampPercent(probability),
    level: probability <= 30 ? "good" : probability <= 60 ? "caution" : "bad",
    value: `${Math.round(probability)}%`,
  };
}

/** Normalized against 40km/h, matching the outfit tip thresholds (20/30km/h). */
export function windBar(speedKmh: number): BarData {
  return {
    percent: clampPercent((speedKmh / 40) * 100),
    level: speedKmh < 20 ? "good" : speedKmh < 30 ? "caution" : "bad",
    value: `${Math.round(speedKmh)}km/h`,
  };
}

function dustLevelToBarLevel(label: string): BarLevel {
  if (label === "좋음") return "good";
  if (label === "보통") return "caution";
  return "bad";
}

/** Normalized against 150㎍/m³ (the "매우 나쁨" threshold). */
export function pm10Bar(pm10: number): BarData {
  const label = getPm10Level(pm10);
  return {
    percent: clampPercent((pm10 / 150) * 100),
    level: dustLevelToBarLevel(label),
    value: label,
  };
}

/** Normalized against 75㎍/m³ (the "매우 나쁨" threshold). */
export function pm25Bar(pm25: number): BarData {
  const label = getPm25Level(pm25);
  return {
    percent: clampPercent((pm25 / 75) * 100),
    level: dustLevelToBarLevel(label),
    value: label,
  };
}

/** Normalized against a UV index of 11 (WHO's "extreme" cutoff). */
export function uvBar(uvIndex: number): BarData {
  const label = getUvLevel(uvIndex);
  const level: BarLevel = label === "낮음" || label === "보통" ? "good" : label === "높음" ? "caution" : "bad";
  return {
    percent: clampPercent((uvIndex / 11) * 100),
    level,
    value: `${label} ${Math.round(uvIndex)}`,
  };
}
