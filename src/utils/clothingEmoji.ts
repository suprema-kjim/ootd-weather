/** Best-effort emoji for a Korean clothing item name, used to decorate outfit chips. */
const RULES: [RegExp, string][] = [
  [/패딩/, "🧥"],
  [/목도리/, "🧣"],
  [/장갑/, "🧤"],
  [/히트텍|기모/, "🔥"],
  [/방한/, "🥶"],
  [/반바지/, "🩳"],
  [/바지/, "👖"],
  [/스타킹/, "🧦"],
  [/민소매/, "🎽"],
  [/원피스/, "👗"],
  [/반팔|셔츠|맨투맨/, "👕"],
  [/니트/, "🧶"],
  [/가디건|자켓|코트/, "🧥"],
  [/린넨/, "🧵"],
];

export function getClothingEmoji(item: string): string {
  for (const [pattern, emoji] of RULES) {
    if (pattern.test(item)) return emoji;
  }
  return "👕";
}
