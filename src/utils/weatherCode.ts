// WMO Weather interpretation codes (https://open-meteo.com/en/docs)
interface WeatherInfo {
  label: string;
  icon: string;
}

const WEATHER_CODE_MAP: Record<number, WeatherInfo> = {
  0: { label: "맑음", icon: "☀️" },
  1: { label: "대체로 맑음", icon: "🌤️" },
  2: { label: "부분적으로 흐림", icon: "⛅" },
  3: { label: "흐림", icon: "☁️" },
  45: { label: "안개", icon: "🌫️" },
  48: { label: "짙은 안개", icon: "🌫️" },
  51: { label: "약한 이슬비", icon: "🌦️" },
  53: { label: "이슬비", icon: "🌦️" },
  55: { label: "강한 이슬비", icon: "🌧️" },
  56: { label: "약한 어는 이슬비", icon: "🌧️" },
  57: { label: "어는 이슬비", icon: "🌧️" },
  61: { label: "약한 비", icon: "🌧️" },
  63: { label: "비", icon: "🌧️" },
  65: { label: "강한 비", icon: "🌧️" },
  66: { label: "약한 어는 비", icon: "🌧️" },
  67: { label: "어는 비", icon: "🌧️" },
  71: { label: "약한 눈", icon: "🌨️" },
  73: { label: "눈", icon: "🌨️" },
  75: { label: "강한 눈", icon: "❄️" },
  77: { label: "싸락눈", icon: "🌨️" },
  80: { label: "약한 소나기", icon: "🌦️" },
  81: { label: "소나기", icon: "🌧️" },
  82: { label: "강한 소나기", icon: "⛈️" },
  85: { label: "약한 소나기눈", icon: "🌨️" },
  86: { label: "강한 소나기눈", icon: "🌨️" },
  95: { label: "뇌우", icon: "⛈️" },
  96: { label: "우박 동반 뇌우", icon: "⛈️" },
  99: { label: "강한 우박 동반 뇌우", icon: "⛈️" },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return WEATHER_CODE_MAP[code] ?? { label: "알 수 없음", icon: "❓" };
}
