// Scenario stat effects - indexed by round (0-4)
export const SCENARIO_EFFECTS = [
  // Round 1: Factory Labor
  {
    choiceA: { money: 15, alienation: 10, freedom: -5 },
    choiceB: { money: -5, alienation: -5, freedom: 10 },
  },
  // Round 2: Promotion Opportunity
  {
    choiceA: { money: 20, alienation: 15, freedom: -10 },
    choiceB: { money: -10, alienation: -10, freedom: 15 },
  },
  // Round 3: Education vs Labor
  {
    choiceA: { money: 10, alienation: 10, freedom: -5 },
    choiceB: { money: -10, alienation: -10, freedom: 15 },
  },
  // Round 4: Economic Crisis
  {
    choiceA: { money: 5, alienation: 20, freedom: -15 },
    choiceB: { money: -15, alienation: -10, freedom: 25 },
  },
  // Round 5: The Final Path
  {
    choiceA: { money: 25, alienation: 25, freedom: -20 },
    choiceB: { money: -10, alienation: -20, freedom: 30 },
  },
];

export interface RandomEventDef {
  id: string;
  name: string;
  effects: { money: number; alienation: number; freedom: number };
}

export const RANDOM_EVENTS: RandomEventDef[] = [
  {
    id: "sickness",
    name: "Bệnh tật",
    effects: { money: -15, alienation: 0, freedom: 0 },
  },
  {
    id: "device_broken",
    name: "Hỏng thiết bị",
    effects: { money: -10, alienation: 0, freedom: 0 },
  },
];

export const RANDOM_EVENT_CHANCE = 0.2;

export function calculateNewStats(
  player: {
    money: number;
    alienation: number;
    freedom: number;
    inSurvivalCrisis: boolean;
  },
  effects: { money: number; alienation: number; freedom: number }
): {
  money: number;
  alienation: number;
  freedom: number;
  inSurvivalCrisis: boolean;
  isAlive: boolean;
} {
  let dm = effects.money;
  let da = effects.alienation;
  let df = effects.freedom;

  // Alienation Mechanic: Higher alienation -> easier to gain money
  if (dm > 0) {
    dm = Math.round(dm * (1 + player.alienation / 100));
  }

  // Alienation Mechanic: Higher alienation -> freedom decreases faster
  if (df < 0) {
    df = Math.round(df * (1 + player.alienation / 100));
  }

  // Freedom Mechanic: Freedom can ONLY increase if Money > 30
  if (df > 0 && player.money <= 30) {
    df = 0;
  }

  // Survival Trap: If in survival crisis, Freedom gains reduced by 50%
  if (df > 0 && player.inSurvivalCrisis) {
    df = Math.round(df * 0.5);
  }

  const newMoney = Math.max(0, player.money + dm);
  const newAlienation = Math.max(0, Math.min(100, player.alienation + da));
  const newFreedom = Math.max(0, Math.min(100, player.freedom + df));

  return {
    money: newMoney,
    alienation: newAlienation,
    freedom: newFreedom,
    inSurvivalCrisis: player.inSurvivalCrisis || newMoney < 10,
    isAlive: newMoney > 0,
  };
}

export function calculateScore(player: {
  freedom: number;
  alienation: number;
  money: number;
}): number {
  return player.freedom * 10 - player.alienation * 5 + player.money;
}

export function checkWinCondition(player: {
  freedom: number;
  alienation: number;
  money: number;
  isAlive: boolean;
}): boolean {
  return (
    player.isAlive &&
    player.freedom > 70 &&
    player.money > 20 &&
    player.alienation < 30
  );
}
