export interface BirthData {
  date: Date;
  latitude: number;
  longitude: number;
  timezone: string;
}

export type ZodiacSign =
  | "Aries" | "Taurus" | "Gemini" | "Cancer"
  | "Leo" | "Virgo" | "Libra" | "Scorpio"
  | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export interface ZodiacInfo {
  sign: ZodiacSign;
  symbol: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  quality: "Cardinal" | "Fixed" | "Mutable";
  ruler: string;
  strengths: string[];
  challenges: string[];
}

const ZODIAC_DATA: Record<ZodiacSign, Omit<ZodiacInfo, "sign">> = {
  Aries: {
    symbol: "♈",
    element: "Fire",
    quality: "Cardinal",
    ruler: "Mars",
    strengths: ["Courageous", "Energetic", "Pioneering"],
    challenges: ["Impatient", "Impulsive", "Aggressive"],
  },
  Taurus: {
    symbol: "♉",
    element: "Earth",
    quality: "Fixed",
    ruler: "Venus",
    strengths: ["Reliable", "Patient", "Practical"],
    challenges: ["Stubborn", "Possessive", "Resistant to change"],
  },
  Gemini: {
    symbol: "♊",
    element: "Air",
    quality: "Mutable",
    ruler: "Mercury",
    strengths: ["Adaptable", "Curious", "Communicative"],
    challenges: ["Inconsistent", "Indecisive", "Nervous"],
  },
  Cancer: {
    symbol: "♋",
    element: "Water",
    quality: "Cardinal",
    ruler: "Moon",
    strengths: ["Nurturing", "Intuitive", "Protective"],
    challenges: ["Moody", "Oversensitive", "Clingy"],
  },
  Leo: {
    symbol: "♌",
    element: "Fire",
    quality: "Fixed",
    ruler: "Sun",
    strengths: ["Confident", "Generous", "Creative"],
    challenges: ["Arrogant", "Dominating", "Stubborn"],
  },
  Virgo: {
    symbol: "♍",
    element: "Earth",
    quality: "Mutable",
    ruler: "Mercury",
    strengths: ["Analytical", "Practical", "Helpful"],
    challenges: ["Overcritical", "Perfectionist", "Worrier"],
  },
  Libra: {
    symbol: "♎",
    element: "Air",
    quality: "Cardinal",
    ruler: "Venus",
    strengths: ["Diplomatic", "Fair", "Social"],
    challenges: ["Indecisive", "Avoids confrontation", "Self-pitying"],
  },
  Scorpio: {
    symbol: "♏",
    element: "Water",
    quality: "Fixed",
    ruler: "Pluto",
    strengths: ["Passionate", "Resourceful", "Determined"],
    challenges: ["Jealous", "Secretive", "Resentful"],
  },
  Sagittarius: {
    symbol: "♐",
    element: "Fire",
    quality: "Mutable",
    ruler: "Jupiter",
    strengths: ["Optimistic", "Adventurous", "Philosophical"],
    challenges: ["Tactless", "Restless", "Overconfident"],
  },
  Capricorn: {
    symbol: "♑",
    element: "Earth",
    quality: "Cardinal",
    ruler: "Saturn",
    strengths: ["Disciplined", "Responsible", "Ambitious"],
    challenges: ["Pessimistic", "Stubborn", "Unforgiving"],
  },
  Aquarius: {
    symbol: "♒",
    element: "Air",
    quality: "Fixed",
    ruler: "Uranus",
    strengths: ["Progressive", "Independent", "Humanitarian"],
    challenges: ["Detached", "Rebellious", "Unpredictable"],
  },
  Pisces: {
    symbol: "♓",
    element: "Water",
    quality: "Mutable",
    ruler: "Neptune",
    strengths: ["Compassionate", "Artistic", "Intuitive"],
    challenges: ["Overly trusting", "Escapist", "Vague"],
  },
};

export function getZodiacSign(date: Date): ZodiacSign {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

export function getZodiacInfo(sign: ZodiacSign): ZodiacInfo {
  return {
    sign,
    ...ZODIAC_DATA[sign],
  };
}

export function getMoonPhase(date: Date = new Date()): {
  phase: string;
  emoji: string;
  illumination: number;
  description: string;
} {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let c = 365.25 * year;
  let e = 30.6 * month;
  let jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  let b = Math.floor(jd);
  jd -= b;
  b = Math.round(jd * 8);

  if (b >= 8) b = 0;

  const phases = [
    { phase: "New Moon", emoji: "🌑", illumination: 0, description: "New beginnings, setting intentions, fresh starts" },
    { phase: "Waxing Crescent", emoji: "🌒", illumination: 12.5, description: "Growth, manifestation, taking action" },
    { phase: "First Quarter", emoji: "🌓", illumination: 50, description: "Overcoming obstacles, making decisions" },
    { phase: "Waxing Gibbous", emoji: "🌔", illumination: 75, description: "Refinement, adjustment, patience" },
    { phase: "Full Moon", emoji: "🌕", illumination: 100, description: "Culmination, release, manifestation" },
    { phase: "Waning Gibbous", emoji: "🌖", illumination: 75, description: "Gratitude, sharing wisdom, reflection" },
    { phase: "Last Quarter", emoji: "🌗", illumination: 50, description: "Letting go, forgiveness, completion" },
    { phase: "Waning Crescent", emoji: "🌘", illumination: 12.5, description: "Rest, surrender, spiritual work" },
  ];

  return phases[b];
}

export function getDailyGuidance(
  sign: ZodiacSign,
  moonPhase: string,
  cyclePhase: string
): {
  title: string;
  message: string;
  activities: string[];
  warnings: string[];
} {
  const signData = ZODIAC_DATA[sign];

  // Combine astrological and hormonal insights
  const guidance = {
    title: `${sign} in ${moonPhase}`,
    message: "",
    activities: [] as string[],
    warnings: [] as string[],
  };

  // Moon phase influence
  if (moonPhase.includes("New")) {
    guidance.activities.push("Set new intentions", "Start fresh projects");
  } else if (moonPhase.includes("Full")) {
    guidance.activities.push("Complete ongoing tasks", "Release what no longer serves you");
  } else if (moonPhase.includes("Waxing")) {
    guidance.activities.push("Build momentum", "Take action on goals");
  } else if (moonPhase.includes("Waning")) {
    guidance.activities.push("Rest and reflect", "Cleanse and declutter");
  }

  // Cycle phase influence
  if (cyclePhase === "menstrual") {
    guidance.message = `Your ${signData.element} sign needs rest during menstruation. Honor your intuition and take time to recharge.`;
    guidance.activities.push("Gentle movement", "Journaling", "Meditation");
    guidance.warnings.push("Avoid overcommitting", "Don't push through exhaustion");
  } else if (cyclePhase === "follicular") {
    guidance.message = `Your ${signData.element} energy is rising! This is your power time to start new ventures aligned with your ${sign} nature.`;
    guidance.activities.push("Social activities", "Creative projects", "Planning ahead");
  } else if (cyclePhase === "ovulation") {
    guidance.message = `Peak ${sign} power! Your ${signData.element} element is amplified. Use this magnetic energy wisely.`;
    guidance.activities.push("Important conversations", "Networking", "Performance activities");
    guidance.warnings.push("Avoid making rushed commitments", "Don't overextend yourself");
  } else if (cyclePhase === "luteal") {
    guidance.message = `As a ${sign}, you may feel more introverted now. Honor your need for ${signData.element} grounding activities.`;
    guidance.activities.push("Self-care rituals", "Completing tasks", "Nesting activities");
    guidance.warnings.push("Watch for ${signData.challenges[0]}", "Be gentle with yourself");
  }

  return guidance;
}
