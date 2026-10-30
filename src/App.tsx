import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { YesterdayWeather } from "./components/YesterdayWeather";
import { WeeklyForecast } from "./components/WeeklyForecast";
import { useWeather } from "./hooks/useWeather";

function formatUpdatedAt(iso: string): string {
  return new Date(iso).toLocaleTimeString("ko-KR", { hour12: true });
}

function App() {
  const { data, loading, error, refresh } = useWeather();

  return (
    <div className="app">
      <Header />

      <main className="main">
        {error && (
          <div className="error-card">
            <p>⚠️ {error}</p>
            <button type="button" onClick={refresh}>
              다시 시도
            </button>
          </div>
        )}

        {!error && !data && <div className="loading-card">날씨 정보를 불러오는 중...</div>}

        {data && (
          <>
            <CurrentWeather current={data.current} today={data.today} />
            <YesterdayWeather yesterday={data.yesterday} />
            <WeeklyForecast week={data.week} />

            <footer className="footer">
              <span>마지막 업데이트 {formatUpdatedAt(data.fetchedAt)}</span>
              <button type="button" onClick={refresh} disabled={loading}>
                {loading ? "갱신 중..." : "지금 새로고침"}
              </button>
              <span className="footer-note">매 시간마다 자동으로 갱신돼요</span>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
