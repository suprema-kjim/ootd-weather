import type { BarData } from "../utils/statBars";

interface Props extends BarData {
  icon: string;
  label: string;
}

export function StatBar({ icon, label, percent, level, value }: Props) {
  return (
    <div className={`stat-bar stat-bar-${level}`}>
      <span className="stat-bar-icon icon-emoji" aria-hidden="true">
        {icon}
      </span>
      <span className="stat-bar-label">{label}</span>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="stat-bar-value">{value}</span>
    </div>
  );
}
