export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal";

export interface CycleInfo {
  phase: CyclePhase;
  dayInCycle: number;
  daysUntilNextPeriod: number;
  phaseDescription: string;
  phaseEnergy: string;
  phaseEmotions: string;
}

const AVERAGE_CYCLE_LENGTH = 28;
const MENSTRUAL_PHASE_LENGTH = 5;
const FOLLICULAR_PHASE_LENGTH = 9;
const OVULATION_PHASE_LENGTH = 3;
const LUTEAL_PHASE_LENGTH = 11;

export function getCyclePhase(lastPeriodStart: Date, today: Date = new Date()): CycleInfo {
  const daysSinceLastPeriod = Math.floor(
    (today.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  const dayInCycle = (daysSinceLastPeriod % AVERAGE_CYCLE_LENGTH) + 1;
  const daysUntilNextPeriod = AVERAGE_CYCLE_LENGTH - dayInCycle;

  let phase: CyclePhase;
  let phaseDescription: string;
  let phaseEnergy: string;
  let phaseEmotions: string;

  if (dayInCycle <= MENSTRUAL_PHASE_LENGTH) {
    phase = "menstrual";
    phaseDescription = "Menstruation - Your body is shedding the uterine lining";
    phaseEnergy = "Low energy, need for rest and introspection";
    phaseEmotions = "Reflective, intuitive, sensitive";
  } else if (dayInCycle <= MENSTRUAL_PHASE_LENGTH + FOLLICULAR_PHASE_LENGTH) {
    phase = "follicular";
    phaseDescription = "Follicular Phase - Estrogen is rising, new follicles developing";
    phaseEnergy = "Increasing energy, motivation, and confidence";
    phaseEmotions = "Optimistic, social, creative";
  } else if (dayInCycle <= MENSTRUAL_PHASE_LENGTH + FOLLICULAR_PHASE_LENGTH + OVULATION_PHASE_LENGTH) {
    phase = "ovulation";
    phaseDescription = "Ovulation - Peak fertility, egg released from ovary";
    phaseEnergy = "Highest energy levels, peak strength and stamina";
    phaseEmotions = "Confident, outgoing, magnetic";
  } else {
    phase = "luteal";
    phaseDescription = "Luteal Phase - Progesterone rising, body preparing for potential pregnancy";
    phaseEnergy = "Energy declining, need for self-care and nesting";
    phaseEmotions = "Introspective, may experience PMS symptoms";
  }

  return {
    phase,
    dayInCycle,
    daysUntilNextPeriod,
    phaseDescription,
    phaseEnergy,
    phaseEmotions,
  };
}

export function getPhaseColor(phase: CyclePhase): string {
  switch (phase) {
    case "menstrual":
      return "#FF3B30"; // systemRed
    case "follicular":
      return "#34C759"; // systemGreen
    case "ovulation":
      return "#FF9500"; // systemOrange
    case "luteal":
      return "#5856D6"; // systemIndigo
    default:
      return "#007AFF"; // systemBlue
  }
}

export function getPhaseName(phase: CyclePhase): string {
  switch (phase) {
    case "menstrual":
      return "Menstrual";
    case "follicular":
      return "Follicular";
    case "ovulation":
      return "Ovulation";
    case "luteal":
      return "Luteal";
  }
}
