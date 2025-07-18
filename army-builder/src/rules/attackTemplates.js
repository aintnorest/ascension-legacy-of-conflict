import { ATTACK_TEMPLATE_SYMBOLS } from './symbols.js';

export const ATTACK_TEMPLATES = {
  singleTarget: {
    icon: ATTACK_TEMPLATE_SYMBOLS.SINGLE_TARGET,
    name: "Single Target",
    description: "Attacks one model within range.",
    baseCosts: {
      primary: 10,
      secondary: 5
    },
    rangeUpgrades: [
      { range: 0, cost: 0, label: '0" (Base Contact)' },
      { range: 1, cost: 1, label: '1"' },
      { range: 2, cost: 2, label: '2"' },
      { range: 3, cost: 3, label: '3"' },
      { range: 4, cost: 5, label: '4"' },
      { range: 5, cost: 7, label: '5"' },
      { range: 6, cost: 9, label: '6"' },
      { range: 7, cost: 11, label: '7"' },
      { range: 8, cost: 13, label: '8"' },
      { range: 9, cost: 14, label: '9"' },
      { range: 10, cost: 17, label: '10"' },
      { range: 11, cost: 20, label: '11"' },
      { range: 12, cost: 23, label: '12"' }
    ]
  },
  area: {
    icon: ATTACK_TEMPLATE_SYMBOLS.AREA,
    name: "Area",
    description: "Affects all models whose bases are touched by or partially within a circular template centered at the target point.",
    baseCosts: {
      primary: 17,
      secondary: 10
    },
    diameterUpgrades: [
      { diameter: 0, cost: 0, label: '0" (Center Point/Self)', restriction: "Only legal if range is 0" },
      { diameter: 1, cost: 2, label: '1" Diameter' },
      { diameter: 2, cost: 5, label: '2" Diameter' },
      { diameter: 3, cost: 10, label: '3" Diameter' },
      { diameter: 4, cost: 20, label: '4" Diameter' }
    ],
    rangeUpgrades: [
      { range: 0, cost: 1, label: '0"' },
      { range: 1, cost: 2, label: '1"' },
      { range: 2, cost: 4, label: '2"' },
      { range: 3, cost: 6, label: '3"' },
      { range: 4, cost: 9, label: '4"' },
      { range: 5, cost: 12, label: '5"' },
      { range: 6, cost: 16, label: '6"' },
      { range: 7, cost: 20, label: '7"' },
      { range: 8, cost: 25, label: '8"' }
    ]
  },
  breakthrough: {
    icon: ATTACK_TEMPLATE_SYMBOLS.BREAKTHROUGH,
    name: "Breakthrough",
    description: "Affects models whose bases are touched by or intersect with a 1\" wide line drawn from the attacker's front arc.",
    baseCosts: {
      primary: 16,
      secondary: 9
    },
    lengthUpgrades: [
      { length: 1, cost: 1, label: '1"' },
      { length: 2, cost: 2, label: '2"' },
      { length: 3, cost: 4, label: '3"' },
      { length: 4, cost: 6, label: '4"' },
      { length: 5, cost: 9, label: '5"' },
      { length: 6, cost: 12, label: '6"' },
      { length: 7, cost: 16, label: '7"' },
      { length: 8, cost: 20, label: '8"' }
    ]
  },
  ricochet: {
    icon: ATTACK_TEMPLATE_SYMBOLS.RICOCHET,
    name: "Ricochet",
    description: "Chain attack that hits multiple targets in sequence, following line of sight rules between each target.",
    baseCosts: {
      primary: 14,
      secondary: 7
    },
    targetUpgrades: [
      { targets: 1, cost: 0, label: '1 Target (initial only)' },
      { targets: 2, cost: 2, label: '2 Targets' },
      { targets: 3, cost: 6, label: '3 Targets' }
    ],
    rangeBetweenUpgrades: [
      { range: 0, cost: 0, label: '0" (base to base only)' },
      { range: 1, cost: 1, label: '1"' },
      { range: 2, cost: 2, label: '2"' },
      { range: 3, cost: 4, label: '3"' },
      { range: 4, cost: 6, label: '4"' }
    ],
    initialRangeUpgrades: [
      { range: 0, cost: 1, label: '0" (base to base)' },
      { range: 1, cost: 2, label: '1"' },
      { range: 2, cost: 3, label: '2"' },
      { range: 3, cost: 5, label: '3"' },
      { range: 4, cost: 7, label: '4"' },
      { range: 5, cost: 9, label: '5"' },
      { range: 6, cost: 12, label: '6"' },
      { range: 7, cost: 15, label: '7"' },
      { range: 8, cost: 18, label: '8"' }
    ]
  }
};
