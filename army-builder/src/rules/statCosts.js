import { STATS_SYMBOLS } from './symbols.js';

export const STAT_COSTS_AND_MAX = {
  wounds: {
    icon: STATS_SYMBOLS.WOUNDS,
    name: "Wounds",
    baseValue: "wounds", // property name in sizeRows
    maxUpgrades: 5,
    costType: "progressive",
    costs: [1, 2, 3, 4, 5], // incremental costs
    description: "Each additional Wound beyond the model's Base Wounds costs progressively more."
  },
  defense: {
    icon: STATS_SYMBOLS.DEFENSE,
    name: "Defense",
    baseValue: "defense", // property name in sizeRows
    maxUpgrades: 3,
    costType: "progressive",
    costs: [4, 6, 8], // incremental costs
    description: "Each additional point of Defense beyond the base 2 costs progressively more."
  },
  attackSkill: {
    icon: STATS_SYMBOLS.ATTACK_SKILL,
    name: "Attack Skill",
    baseValue: "attackSkill", // property name in sizeRows
    maxUpgrades: 6,
    costType: "progressive",
    costs: [3, 5, 7, 9, 11, 13], // incremental costs
    description: "Each additional point of Attack Skill beyond the base 0 costs progressively more."
  },
  strides: {
    icon: STATS_SYMBOLS.STRIDES,
    name: "Strides",
    baseValue: "strides", // property name in sizeRows
    maxUpgrades: 3,
    costType: "size-based",
    costs: {
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 5
    },
    description: "Each additional Stride beyond the model's Base Strides has a fixed cost based on the model's Size Value."
  }
};
