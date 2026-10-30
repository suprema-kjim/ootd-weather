import { LOCATION } from "../constants";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = WEEKDAYS[date.getDay()];
  return `${y}년 ${m}월 ${d}일 (${w})`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("ko-KR", { hour12: true });
}

interface Props {
  now: Date;
}

export function Header({ now }: Props) {
  return (
    <header className="header">
      <p className="header-location">📍 {LOCATION.name}</p>
      <h1 className="header-date">{formatDate(now)}</h1>
      <p className="header-time">{formatTime(now)}</p>
    </header>
  );
}
