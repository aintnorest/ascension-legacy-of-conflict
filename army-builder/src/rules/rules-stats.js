import { STATS_SYMBOLS } from './symbols.js';

export const BASE_STATS_TABLE = [
  { value: 0.5, min: 0, max: 24, strides: 4, wounds: 1, influence: `0"`, attackSkill: 0, defense: 1, sizeCost: 0, terrainOnly: true, exampleReferences: `Dog, mailbox, crate` },
  { value: 1, min: 25, max: 39, strides: 3, wounds: 1, influence: `0"`, attackSkill: 0, defense: 2, sizeCost: 0, exampleReferences: `Human, humanoid` },
  { value: 2, min: 40, max: 59, strides: 2, wounds: 1, influence: `1"`, attackSkill: 0, defense: 2, sizeCost: 1, exampleReferences: `Large human, motorcycle` },
  { value: 3, min: 60, max: 89, strides: 2, wounds: 1, influence: `3"`, attackSkill: 0, defense: 2, sizeCost: 2, exampleReferences: `Car, large dumpster` },
  { value: 4, min: 90, max: 129, strides: 1, wounds: 2, influence: `4"`, attackSkill: 0, defense: 2, sizeCost: 4, exampleReferences: `Dump truck, small building` },
  { value: 5, min: 130, max: 170, strides: 1, wounds: 2, influence: `5"`, attackSkill: 0, defense: 2, sizeCost: 5, exampleReferences: `Medium building` },
  { value: 6, min: 171, max: 999, strides: 1, wounds: 3, influence: `6"`, attackSkill: 0, defense: 3, sizeCost: 8, terrainOnly: true, exampleReferences: `Large building` },
];

export const STAT_COSTS_AND_MAX = {
  size: {
    icon: STATS_SYMBOLS.SIZE,
    name: `Size`,
    baseValue: `size`, // property name in character data
    maxUpgrades: 0, // Size is determined by model, not upgraded
    costType: `fixed`,
    costs: [], // No upgrade costs, cost is in BASE_STATS_TABLE
    description: `Size is determined by the model's base diameter in millimeters. Larger models have different base stats and capabilities.`,
  },
  influence: {
    icon: STATS_SYMBOLS.INFLUENCE,
    name: `Influence`,
    baseValue: `influence`, // property name in sizeRows
    maxUpgrades: 0, // Influence is determined by size, not upgraded separately
    costType: `size-based`,
    costs: {},
    description: `Influence determines the range at which this character can interact with scenario components. Measured in inches.`,
  },
  wounds: {
    icon: STATS_SYMBOLS.WOUNDS,
    name: `Wounds`,
    baseValue: `wounds`, // property name in sizeRows
    maxUpgrades: 5,
    costType: `progressive`,
    costs: [1, 2, 3, 4, 5], // incremental costs
    description: `Each additional Wound beyond the model's Base Wounds costs progressively more.`,
  },
  defense: {
    icon: STATS_SYMBOLS.DEFENSE,
    name: `Defense`,
    baseValue: `defense`, // property name in sizeRows
    maxUpgrades: 3,
    costType: `progressive`,
    costs: [4, 6, 8], // incremental costs
    description: `Each additional point of Defense beyond the base 2 costs progressively more.`,
  },
  attackSkill: {
    icon: STATS_SYMBOLS.ATTACK_SKILL,
    name: `Attack Skill`,
    baseValue: `attackSkill`, // property name in sizeRows
    maxUpgrades: 6,
    costType: `progressive`,
    costs: [3, 5, 7, 9, 11, 13], // incremental costs
    description: `Each additional point of Attack Skill beyond the base 0 costs progressively more.`,
  },
  strides: {
    icon: STATS_SYMBOLS.STRIDES,
    name: `Strides`,
    baseValue: `strides`, // property name in sizeRows
    maxUpgrades: 2,
    costType: `size-based`,
    costs: {
      1: 2,
      2: 4,
      3: 8,
      4: 10,
      5: 12,
    },
    description: `Each additional Stride beyond the model's Base Strides has a fixed cost based on the model's Size Value.`,
  },
};

const sizeCategoryTable = {
  type: `table`,
  title: `Size Category Selection`,
  description: `Model base size determines the character's Size Category.`,
  headers: [`Base Size`, `Size Value`, `Cost`],
  computeRows: () => BASE_STATS_TABLE.filter(row => !row.terrainOnly).map(row => [
    `${row.min}-${row.max}mm`,
    row.value.toString(),
    row.sizeCost.toString(),
  ]),
};

const baseStatsBySizeTable = {
  type: `table`,
  title: `Base Stats by Size`,
  description: `Base stats for each Size Category. These stats are used as the foundation for character creation.`,
  headers: [`${STATS_SYMBOLS.SIZE} Size`, `${STATS_SYMBOLS.STRIDES} Strides`, `${STATS_SYMBOLS.WOUNDS} Wounds`, `${STATS_SYMBOLS.INFLUENCE} Influence`, `${STATS_SYMBOLS.ATTACK_SKILL} Attack Skill`, `${STATS_SYMBOLS.DEFENSE} Defense`],
  computeRows: () => BASE_STATS_TABLE.filter(row => !row.terrainOnly).map(row => [
    row.value.toString(),
    row.strides.toString(),
    row.wounds.toString(),
    row.influence,
    row.attackSkill.toString(),
    row.defense.toString(),
  ]),
};

export const sizeCategorySelection = {
  name: `Size Category Selection and Base Stats`,
  description: `When creating a character start with a miniature model you want to represent. The model's base size according to their largest dimension in millimeters determines its Size Category, which in turn defines its base stats. Each Size Category has a specific Size Value and associated costs for upgrades.`,
  rules: [
    sizeCategoryTable,
    baseStatsBySizeTable,
  ],
};

const woundCostTable = {
  type: `table`,
  title: `Wound Upgrade Costs`,
  description: `Cost of increasing Wounds.`,
  headers: [`Upgrade Level`, `Incremental Cost`, `Cumulative Cost`],
  computeRows: () => {
    const costs = STAT_COSTS_AND_MAX.wounds.costs;
    let cumulative = 0;
    return costs.map((cost, index) => {
      cumulative += cost;
      return [`+${index + 1}`, cost.toString(), cumulative.toString()];
    });
  },
};

const stridesCostTable = {
  type: `table`,
  title: `Strides Upgrade Costs`,
  description: `Cost of increasing Strides based on Size Category.`,
  headers: [`Size Value`, `Base Strides`, `Cost per Additional Stride`],
  computeRows: () => Object.entries(STAT_COSTS_AND_MAX.strides.costs).map(([size, cost]) => [
    size,
    BASE_STATS_TABLE.find(row => row.value === parseInt(size)).strides.toString(),
    cost.toString(),
  ]),
};

const attackSkillCostTable = {
  type: `table`,
  title: `Attack Skill Upgrade Costs`,
  description: `Progressive cost for increasing Attack Skill beyond base value.`,
  headers: [`Upgrade Level`, `Incremental Cost`, `Cumulative Cost`],
  computeRows: () => {
    const costs = STAT_COSTS_AND_MAX.attackSkill.costs;
    let cumulative = 0;
    return costs.map((cost, index) => {
      cumulative += cost;
      return [`+${index + 1}`, cost.toString(), cumulative.toString()];
    });
  },
};

const defenseCostTable = {
  type: `table`,
  title: `Defense Upgrade Costs`,
  description: `Progressive cost for increasing Defense beyond base value.`,
  headers: [`Upgrade Level`, `Incremental Cost`, `Cumulative Cost`],
  computeRows: () => {
    const costs = STAT_COSTS_AND_MAX.defense.costs;
    let cumulative = 0;
    return costs.map((cost, index) => {
      cumulative += cost;
      return [`+${index + 1}`, cost.toString(), cumulative.toString()];
    });
  },
};

export const statAllocationRules = {
  name: `Stat Allocation Rules`,
  description: `This section details rules for increasing stats. Upgrade Level columns indicate not the stat value but the base stat value plus the upgrade level.`,
  rules: [
    stridesCostTable,
    woundCostTable,
    attackSkillCostTable,
    defenseCostTable,
  ],
};
