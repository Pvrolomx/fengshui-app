// ==========================================
// FENG SHUI CALCULATIONS LIBRARY
// Flying Stars (Fei Xing) + Kua Number + Elements
// ==========================================

// 9 Stars data
export interface Star {
  number: number;
  name: string;
  chineseName: string;
  element: Element;
  nature: 'auspicious' | 'inauspicious' | 'neutral';
  color: string;
  meaning: string;
  remedies: string[];
  activators: string[];
}

export type Element = 'water' | 'wood' | 'fire' | 'earth' | 'metal';

export const ELEMENTS: Record<Element, {
  chinese: string;
  colors: string[];
  shapes: string[];
  materials: string[];
  produces: Element;
  destroys: Element;
  weakenedBy: Element;
}> = {
  water: {
    chinese: '水',
    colors: ['Black', 'Blue', 'Dark blue'],
    shapes: ['Wavy', 'Irregular', 'Flowing'],
    materials: ['Glass', 'Mirrors', 'Water features'],
    produces: 'wood',
    destroys: 'fire',
    weakenedBy: 'earth',
  },
  wood: {
    chinese: '木',
    colors: ['Green', 'Teal', 'Light blue'],
    shapes: ['Rectangular', 'Columnar', 'Vertical'],
    materials: ['Wood', 'Plants', 'Paper', 'Cotton'],
    produces: 'fire',
    destroys: 'earth',
    weakenedBy: 'metal',
  },
  fire: {
    chinese: '火',
    colors: ['Red', 'Orange', 'Pink', 'Purple'],
    shapes: ['Triangular', 'Pointed', 'Angular'],
    materials: ['Candles', 'Lights', 'Electronics', 'Leather'],
    produces: 'earth',
    destroys: 'metal',
    weakenedBy: 'water',
  },
  earth: {
    chinese: '土',
    colors: ['Yellow', 'Brown', 'Beige', 'Terracotta'],
    shapes: ['Square', 'Flat', 'Low'],
    materials: ['Ceramics', 'Clay', 'Stone', 'Crystals'],
    produces: 'metal',
    destroys: 'water',
    weakenedBy: 'wood',
  },
  metal: {
    chinese: '金',
    colors: ['White', 'Gray', 'Gold', 'Silver', 'Copper'],
    shapes: ['Round', 'Oval', 'Arched', 'Domed'],
    materials: ['Metal objects', 'Coins', 'Bells', 'Clocks'],
    produces: 'water',
    destroys: 'wood',
    weakenedBy: 'fire',
  },
};

export const STARS: Star[] = [
  {
    number: 1,
    name: 'White',
    chineseName: '一白',
    element: 'water',
    nature: 'auspicious',
    color: '#3182ce',
    meaning: 'Career luck, wisdom, academic success, romance for singles',
    remedies: [],
    activators: ['Metal objects', 'Moving water', 'Blue/black decor'],
  },
  {
    number: 2,
    name: 'Black',
    chineseName: '二黑',
    element: 'earth',
    nature: 'inauspicious',
    color: '#744210',
    meaning: 'Illness star - health problems, especially for mothers/elderly',
    remedies: ['Metal wind chimes', 'Wu Lou (gourd)', 'Six metal coins', 'Salt water cure'],
    activators: [],
  },
  {
    number: 3,
    name: 'Jade',
    chineseName: '三碧',
    element: 'wood',
    nature: 'inauspicious',
    color: '#22543d',
    meaning: 'Conflict, arguments, lawsuits, robbery',
    remedies: ['Red objects', 'Fire element', 'Bright lights', 'Red carpet'],
    activators: [],
  },
  {
    number: 4,
    name: 'Green',
    chineseName: '四綠',
    element: 'wood',
    nature: 'neutral',
    color: '#48bb78',
    meaning: 'Romance, academic/literary success, creativity. Can bring scandals.',
    remedies: ['Fresh flowers in water (for romance)'],
    activators: ['Water features', 'Plants', 'Books', 'Writing desk'],
  },
  {
    number: 5,
    name: 'Yellow',
    chineseName: '五黃',
    element: 'earth',
    nature: 'inauspicious',
    color: '#d69e2e',
    meaning: 'MOST DANGEROUS - Misfortune, accidents, bankruptcy, serious illness',
    remedies: ['Metal wind chimes (6 rods)', 'Five Element Pagoda', 'Salt water cure', 'NO renovations', 'Keep quiet/dark'],
    activators: [],
  },
  {
    number: 6,
    name: 'White',
    chineseName: '六白',
    element: 'metal',
    nature: 'auspicious',
    color: '#a0aec0',
    meaning: 'Heaven luck, authority, leadership, windfall, mentor luck',
    remedies: [],
    activators: ['Moving metal', 'Bells', 'Clocks', 'Round metal objects'],
  },
  {
    number: 7,
    name: 'Red',
    chineseName: '七赤',
    element: 'metal',
    nature: 'inauspicious',
    color: '#e53e3e',
    meaning: 'Violence, theft, fire hazards, betrayal, competition loss',
    remedies: ['Water features', 'Blue/black colors', 'Yin water (still)'],
    activators: [],
  },
  {
    number: 8,
    name: 'White',
    chineseName: '八白',
    element: 'earth',
    nature: 'auspicious',
    color: '#f6e05e',
    meaning: 'MOST AUSPICIOUS - Wealth, prosperity, good fortune (current period star)',
    remedies: [],
    activators: ['Fire element', 'Red/purple colors', 'Lights', 'Activity', 'Water with fire'],
  },
  {
    number: 9,
    name: 'Purple',
    chineseName: '九紫',
    element: 'fire',
    nature: 'auspicious',
    color: '#9f7aea',
    meaning: 'Future prosperity star, celebrations, happy events, recognition',
    remedies: [],
    activators: ['Wood element', 'Plants', 'Green colors', 'Lights'],
  },
];

// 9 Palaces / Sectors with their directions
export const SECTORS = [
  { position: 0, direction: 'SE', chinese: '東南', name: 'Southeast', baseStar: 4 },
  { position: 1, direction: 'S', chinese: '南', name: 'South', baseStar: 9 },
  { position: 2, direction: 'SW', chinese: '西南', name: 'Southwest', baseStar: 2 },
  { position: 3, direction: 'E', chinese: '東', name: 'East', baseStar: 3 },
  { position: 4, direction: 'C', chinese: '中', name: 'Center', baseStar: 5 },
  { position: 5, direction: 'W', chinese: '西', name: 'West', baseStar: 7 },
  { position: 6, direction: 'NE', chinese: '東北', name: 'Northeast', baseStar: 8 },
  { position: 7, direction: 'N', chinese: '北', name: 'North', baseStar: 1 },
  { position: 8, direction: 'NW', chinese: '西北', name: 'Northwest', baseStar: 6 },
];

// Lo Shu Square base arrangement
const LO_SHU_BASE = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

// Flight path order (following the Lo Shu path)
const FLIGHT_PATH = [
  [1, 0], // SE
  [0, 0], // S  
  [0, 1], // SW
  [0, 2], // E
  [1, 1], // Center
  [2, 2], // W
  [2, 1], // NE
  [2, 0], // N
  [1, 2], // NW
];

// Calculate the Annual Flying Star chart
export function getAnnualFlyingStars(year: number): number[][] {
  // The cycle: 2024 = Period 9, Star 3 in center
  // Formula: Center star = (11 - ((year - 2000) % 9)) % 9 || 9
  const centerStar = ((11 - ((year - 2000) % 9)) % 9) || 9;
  return generateFlyingStarChart(centerStar);
}

// Calculate the Monthly Flying Star chart
export function getMonthlyFlyingStars(year: number, month: number): number[][] {
  // Chinese solar months (Li Chun calendar)
  // Month 1 starts around Feb 4
  // Adjusted month for calculation
  const adjustedMonth = month >= 2 ? month - 1 : month + 11;
  const adjustedYear = month >= 2 ? year : year - 1;
  
  // Center star calculation for monthly
  // Based on the year's "year star" and month
  const yearStar = ((11 - ((adjustedYear - 2000) % 9)) % 9) || 9;
  
  // Monthly star cycles
  // Yang years (ending in even): forward sequence
  // Yin years (ending in odd): backward sequence
  const isYangYear = adjustedYear % 2 === 0;
  
  let monthStar: number;
  if (isYangYear) {
    // Yang years start with 8 in month 1 (Feb)
    monthStar = ((8 + adjustedMonth - 1) % 9) || 9;
  } else {
    // Yin years start with 2 in month 1 (Feb), go backwards
    monthStar = ((2 - adjustedMonth + 1 + 18) % 9) || 9;
  }
  
  return generateFlyingStarChart(monthStar);
}

// Generate a flying star chart with given center star
function generateFlyingStarChart(centerStar: number): number[][] {
  const chart: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  
  // Place stars following the Lo Shu flight path
  for (let i = 0; i < 9; i++) {
    const [row, col] = FLIGHT_PATH[i];
    const starNum = ((centerStar - 1 + i) % 9) + 1;
    chart[row][col] = starNum;
  }
  
  return chart;
}

// Get star info by number
export function getStarInfo(num: number): Star {
  return STARS[num - 1];
}

// ==========================================
// KUA NUMBER CALCULATIONS
// ==========================================

export interface KuaInfo {
  number: number;
  group: 'East' | 'West';
  element: Element;
  trigram: string;
  chineseTrigram: string;
  favorableDirections: { direction: string; purpose: string; }[];
  unfavorableDirections: { direction: string; meaning: string; }[];
}

const KUA_DATA: Record<number, Omit<KuaInfo, 'number'>> = {
  1: {
    group: 'East',
    element: 'water',
    trigram: 'Kan',
    chineseTrigram: '坎',
    favorableDirections: [
      { direction: 'SE', purpose: 'Sheng Chi - Prosperity & Success' },
      { direction: 'E', purpose: 'Tien Yi - Health & Vitality' },
      { direction: 'S', purpose: 'Nien Yen - Relationships & Love' },
      { direction: 'N', purpose: 'Fu Wei - Personal Growth' },
    ],
    unfavorableDirections: [
      { direction: 'W', meaning: 'Ho Hai - Bad Luck' },
      { direction: 'NE', meaning: 'Wu Gui - Five Ghosts' },
      { direction: 'NW', meaning: 'Liu Sha - Six Killings' },
      { direction: 'SW', meaning: 'Jue Ming - Total Loss' },
    ],
  },
  2: {
    group: 'West',
    element: 'earth',
    trigram: 'Kun',
    chineseTrigram: '坤',
    favorableDirections: [
      { direction: 'NE', purpose: 'Sheng Chi - Prosperity & Success' },
      { direction: 'W', purpose: 'Tien Yi - Health & Vitality' },
      { direction: 'NW', purpose: 'Nien Yen - Relationships & Love' },
      { direction: 'SW', purpose: 'Fu Wei - Personal Growth' },
    ],
    unfavorableDirections: [
      { direction: 'E', meaning: 'Ho Hai - Bad Luck' },
      { direction: 'SE', meaning: 'Wu Gui - Five Ghosts' },
      { direction: 'S', meaning: 'Liu Sha - Six Killings' },
      { direction: 'N', meaning: 'Jue Ming - Total Loss' },
    ],
  },
  3: {
    group: 'East',
    element: 'wood',
    trigram: 'Chen',
    chineseTrigram: '震',
    favorableDirections: [
      { direction: 'S', purpose: 'Sheng Chi - Prosperity & Success' },
      { direction: 'N', purpose: 'Tien Yi - Health & Vitality' },
      { direction: 'SE', purpose: 'Nien Yen - Relationships & Love' },
      { direction: 'E', purpose: 'Fu Wei - Personal Growth' },
    ],
    unfavorableDirections: [
      { direction: 'SW', meaning: 'Ho Hai - Bad Luck' },
      { direction: 'NW', meaning: 'Wu Gui - Five Ghosts' },
      { direction: 'NE', meaning: 'Liu Sha - Six Killings' },
      { direction: 'W', meaning: 'Jue Ming - Total Loss' },
    ],
  },
  4: {
    group: 'East',
    element: 'wood',
    trigram: 'Sun',
    chineseTrigram: '巽',
    favorableDirections: [
      { direction: 'N', purpose: 'Sheng Chi - Prosperity & Success' },
      { direction: 'S', purpose: 'Tien Yi - Health & Vitality' },
      { direction: 'E', purpose: 'Nien Yen - Relationships & Love' },
      { direction: 'SE', purpose: 'Fu Wei - Personal Growth' },
    ],
    unfavorableDirections: [
      { direction: 'NW', meaning: 'Ho Hai - Bad Luck' },
      { direction: 'SW', meaning: 'Wu Gui - Five Ghosts' },
      { direction: 'W', meaning: 'Liu Sha - Six Killings' },
      { direction: 'NE', meaning: 'Jue Ming - Total Loss' },
    ],
  },
  5: {
    // Kua 5 doesn't exist - males become 2, females become 8
    group: 'West',
    element: 'earth',
    trigram: 'Kun/Gen',
    chineseTrigram: '坤/艮',
    favorableDirections: [],
    unfavorableDirections: [],
  },
  6: {
    group: 'West',
    element: 'metal',
    trigram: 'Chien',
    chineseTrigram: '乾',
    favorableDirections: [
      { direction: 'W', purpose: 'Sheng Chi - Prosperity & Success' },
      { direction: 'NE', purpose: 'Tien Yi - Health & Vitality' },
      { direction: 'SW', purpose: 'Nien Yen - Relationships & Love' },
      { direction: 'NW', purpose: 'Fu Wei - Personal Growth' },
    ],
    unfavorableDirections: [
      { direction: 'SE', meaning: 'Ho Hai - Bad Luck' },
      { direction: 'E', meaning: 'Wu Gui - Five Ghosts' },
      { direction: 'N', meaning: 'Liu Sha - Six Killings' },
      { direction: 'S', meaning: 'Jue Ming - Total Loss' },
    ],
  },
  7: {
    group: 'West',
    element: 'metal',
    trigram: 'Tui',
    chineseTrigram: '兌',
    favorableDirections: [
      { direction: 'NW', purpose: 'Sheng Chi - Prosperity & Success' },
      { direction: 'SW', purpose: 'Tien Yi - Health & Vitality' },
      { direction: 'NE', purpose: 'Nien Yen - Relationships & Love' },
      { direction: 'W', purpose: 'Fu Wei - Personal Growth' },
    ],
    unfavorableDirections: [
      { direction: 'N', meaning: 'Ho Hai - Bad Luck' },
      { direction: 'S', meaning: 'Wu Gui - Five Ghosts' },
      { direction: 'SE', meaning: 'Liu Sha - Six Killings' },
      { direction: 'E', meaning: 'Jue Ming - Total Loss' },
    ],
  },
  8: {
    group: 'West',
    element: 'earth',
    trigram: 'Ken',
    chineseTrigram: '艮',
    favorableDirections: [
      { direction: 'SW', purpose: 'Sheng Chi - Prosperity & Success' },
      { direction: 'NW', purpose: 'Tien Yi - Health & Vitality' },
      { direction: 'W', purpose: 'Nien Yen - Relationships & Love' },
      { direction: 'NE', purpose: 'Fu Wei - Personal Growth' },
    ],
    unfavorableDirections: [
      { direction: 'S', meaning: 'Ho Hai - Bad Luck' },
      { direction: 'N', meaning: 'Wu Gui - Five Ghosts' },
      { direction: 'E', meaning: 'Liu Sha - Six Killings' },
      { direction: 'SE', meaning: 'Jue Ming - Total Loss' },
    ],
  },
  9: {
    group: 'East',
    element: 'fire',
    trigram: 'Li',
    chineseTrigram: '離',
    favorableDirections: [
      { direction: 'E', purpose: 'Sheng Chi - Prosperity & Success' },
      { direction: 'SE', purpose: 'Tien Yi - Health & Vitality' },
      { direction: 'N', purpose: 'Nien Yen - Relationships & Love' },
      { direction: 'S', purpose: 'Fu Wei - Personal Growth' },
    ],
    unfavorableDirections: [
      { direction: 'NE', meaning: 'Ho Hai - Bad Luck' },
      { direction: 'W', meaning: 'Wu Gui - Five Ghosts' },
      { direction: 'SW', meaning: 'Liu Sha - Six Killings' },
      { direction: 'NW', meaning: 'Jue Ming - Total Loss' },
    ],
  },
};

// Calculate Kua number
export function calculateKua(birthYear: number, gender: 'male' | 'female'): KuaInfo {
  // Use Chinese solar year (if born before Feb 4, use previous year)
  // For simplicity, we'll use the Western year
  
  // Sum all digits of birth year until single digit
  let sum = birthYear;
  while (sum > 9) {
    sum = String(sum).split('').reduce((a, b) => a + parseInt(b), 0);
  }
  
  let kua: number;
  
  if (gender === 'male') {
    // For males born 2000+: 9 - sum, if result is 0, kua = 9
    // For males born before 2000: 10 - sum
    if (birthYear >= 2000) {
      kua = 9 - sum;
      if (kua <= 0) kua = 9 + kua; // Wrap around
    } else {
      kua = 10 - sum;
      if (kua === 10) kua = 1;
    }
    // Males with Kua 5 become Kua 2
    if (kua === 5) kua = 2;
  } else {
    // For females born 2000+: sum + 6, reduce to single digit
    // For females born before 2000: sum + 5, reduce to single digit
    if (birthYear >= 2000) {
      kua = sum + 6;
    } else {
      kua = sum + 5;
    }
    while (kua > 9) {
      kua = String(kua).split('').reduce((a, b) => a + parseInt(b), 0);
    }
    // Females with Kua 5 become Kua 8
    if (kua === 5) kua = 8;
  }
  
  return {
    number: kua,
    ...KUA_DATA[kua],
  };
}

// Get Chinese zodiac animal
export function getChineseZodiac(year: number): {
  animal: string;
  chineseAnimal: string;
  element: Element;
  chineseElement: string;
} {
  const animals = [
    { animal: 'Rat', chinese: '鼠' },
    { animal: 'Ox', chinese: '牛' },
    { animal: 'Tiger', chinese: '虎' },
    { animal: 'Rabbit', chinese: '兔' },
    { animal: 'Dragon', chinese: '龍' },
    { animal: 'Snake', chinese: '蛇' },
    { animal: 'Horse', chinese: '馬' },
    { animal: 'Goat', chinese: '羊' },
    { animal: 'Monkey', chinese: '猴' },
    { animal: 'Rooster', chinese: '雞' },
    { animal: 'Dog', chinese: '狗' },
    { animal: 'Pig', chinese: '豬' },
  ];
  
  const elements: { element: Element; chinese: string }[] = [
    { element: 'wood', chinese: '木' },
    { element: 'fire', chinese: '火' },
    { element: 'earth', chinese: '土' },
    { element: 'metal', chinese: '金' },
    { element: 'water', chinese: '水' },
  ];
  
  // 1900 was Year of the Metal Rat
  const baseYear = 1900;
  const yearDiff = year - baseYear;
  
  const animalIndex = ((yearDiff % 12) + 12) % 12;
  const elementIndex = Math.floor(((yearDiff % 10) + 10) % 10 / 2);
  
  return {
    animal: animals[animalIndex].animal,
    chineseAnimal: animals[animalIndex].chinese,
    element: elements[elementIndex].element,
    chineseElement: elements[elementIndex].chinese,
  };
}

// Combine all personal feng shui data
export function getPersonalFengShui(birthYear: number, gender: 'male' | 'female') {
  return {
    kua: calculateKua(birthYear, gender),
    zodiac: getChineseZodiac(birthYear),
  };
}
