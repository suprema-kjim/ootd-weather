export interface OutfitRecommendation {
  category: string; // e.g. "매우 더움"
  items: string[];
  tips: string[];
}

function isRainCode(code: number): boolean {
  return (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82) ||
    code === 95 ||
    code === 96 ||
    code === 99
  );
}

function isSnowCode(code: number): boolean {
  return (code >= 71 && code <= 77) || code === 85 || code === 86;
}

/**
 * Recommend an outfit based on the "feels like" temperature, precipitation
 * and wind. Thresholds roughly follow the Korea Meteorological
 * Administration's clothing index guide.
 */
export function getOutfitRecommendation(
  apparentTemperature: number,
  weatherCode: number,
  windSpeed: number,
  precipitationProbability?: number
): OutfitRecommendation {
  const t = apparentTemperature;
  let category: string;
  let items: string[];

  if (t >= 28) {
    category = "매우 더움";
    items = ["민소매", "반팔 티셔츠", "반바지", "원피스", "린넨 소재 옷"];
  } else if (t >= 23) {
    category = "더움";
    items = ["반팔 티셔츠", "얇은 셔츠", "반바지", "면바지"];
  } else if (t >= 20) {
    category = "따뜻함";
    items = ["긴팔 티셔츠", "얇은 가디건", "면바지", "청바지"];
  } else if (t >= 17) {
    category = "선선함";
    items = ["얇은 니트", "맨투맨", "가디건", "청바지"];
  } else if (t >= 12) {
    category = "쌀쌀함";
    items = ["자켓", "가디건", "니트", "청바지", "스타킹"];
  } else if (t >= 9) {
    category = "꽤 추움";
    items = ["트렌치코트", "자켓", "니트", "기모 바지"];
  } else if (t >= 5) {
    category = "추움";
    items = ["코트", "가죽자켓", "히트텍", "니트", "장갑"];
  } else if (t >= 0) {
    category = "매우 추움";
    items = ["패딩", "두꺼운 코트", "목도리", "장갑", "기모 제품"];
  } else {
    category = "혹한";
    items = ["롱패딩", "두꺼운 목도리", "방한 장갑", "기모 제품", "방한용품 풀착용"];
  }

  const tips: string[] = [];

  if (isSnowCode(weatherCode)) {
    tips.push("눈이 예상돼요. 미끄럼 방지 신발을 신으세요. ❄️");
  } else if (isRainCode(weatherCode)) {
    tips.push("비 소식이 있어요. 우산을 꼭 챙기세요. ☔");
  } else if (
    precipitationProbability !== undefined &&
    precipitationProbability >= 40
  ) {
    tips.push("비가 올 가능성이 있어요. 우산을 챙기는 게 좋겠어요. ☔");
  }

  if (windSpeed >= 30) {
    tips.push("바람이 매우 강해요. 모자나 우산이 날아가지 않게 주의하세요. 💨");
  } else if (windSpeed >= 20) {
    tips.push("바람이 꽤 불어요. 겉옷을 챙기는 게 좋겠어요. 💨");
  }

  if (t >= 30) {
    tips.push("자외선이 강할 수 있어요. 선크림과 양산을 챙기세요. 🧴");
  }

  return { category, items, tips };
}
