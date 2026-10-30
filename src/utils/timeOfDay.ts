export type TimePeriod = "dawn" | "morning" | "day" | "evening" | "night";

/** Buckets the current hour into a time-of-day period for the background theme. */
export function getTimePeriod(date: Date): TimePeriod {
  const hour = date.getHours();
  if (hour >= 4 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
}
