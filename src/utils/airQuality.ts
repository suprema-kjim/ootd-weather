// Grade thresholds follow the Korean Ministry of Environment's air quality
// index (㎍/m³) and the WHO UV index scale used by the Korea Meteorological
// Administration.

export function getPm10Level(value: number): string {
  if (value <= 30) return "좋음";
  if (value <= 80) return "보통";
  if (value <= 150) return "나쁨";
  return "매우 나쁨";
}

export function getPm25Level(value: number): string {
  if (value <= 15) return "좋음";
  if (value <= 35) return "보통";
  if (value <= 75) return "나쁨";
  return "매우 나쁨";
}

export function getUvLevel(value: number): string {
  if (value < 3) return "낮음";
  if (value < 6) return "보통";
  if (value < 8) return "높음";
  if (value < 11) return "매우 높음";
  return "위험";
}

export function isBadDustLevel(level: string): boolean {
  return level === "나쁨" || level === "매우 나쁨";
}
