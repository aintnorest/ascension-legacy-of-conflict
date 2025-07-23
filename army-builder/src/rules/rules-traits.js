export const TRAITS = {
  grantDefenseBonus: {
    name: `Grant Defense Bonus (Aura, 2")`,
    description: `Friendly models within 3" gain +1 Defense`,
    cost: 10,
    category: `aura`,
    canTakeMultiple: false,
  },
  reduceWoundTaken1: {
    name: `Reduce Wound Taken (By 1, Min 1)`,
    description: `Reduces all incoming damage by 1 (min 1)`,
    cost: 14,
    category: `defense`,
    canTakeMultiple: false,
  },
  reduceWoundTaken2: {
    name: `Reduce Wound Taken (By 2, Min 1)`,
    description: `Reduces all incoming damage by 2 (min 1)`,
    cost: 18,
    category: `defense`,
    canTakeMultiple: false,
  },
  regenerateSelf: {
    name: `Regenerate Self`,
    description: `At end of activation, heal 1 Wound if no active DOT`,
    cost: 12,
    category: `healing`,
    canTakeMultiple: false,
  },
  attackBonusVsLarge: {
    name: `Attack Bonus vs Large (Size 3+)`,
    description: `+1 to Attack Skill when targeting models with Size 3+`,
    cost: 5,
    category: `offense`,
    canTakeMultiple: false,
  },
  ignoreClimbPenalty: {
    name: `Ignore Climb Penalty`,
    description: `Ignores extra Stride cost for Climbing`,
    cost: 6,
    category: `movement`,
    canTakeMultiple: false,
  },
  defenseBonusVsRanged: {
    name: `Defense Bonus vs Ranged`,
    description: `+2 defense vs ranged attacks`,
    cost: 8,
    category: `defense`,
    canTakeMultiple: false,
  },
  attackPenaltyAura: {
    name: `Attack Penalty Aura (2"+Influence)`,
    description: `-1 to attacks within 2"+influence`,
    cost: 5,
    category: `aura`,
    canTakeMultiple: false,
  },
  attackBonusIfStationary: {
    name: `Attack Bonus If Stationary`,
    description: `+1 to attack if no move action this turn`,
    cost: 5,
    category: `offense`,
    condition: `no movement this turn`,
    canTakeMultiple: false,
  },
  attackPenaltyVsDistant: {
    name: `Attack Penalty vs Distant (6"+)`,
    description: `+1 defense against attacks from beyond 6"`,
    cost: 8,
    category: `defense`,
    canTakeMultiple: false,
  },
  displacementImmunity: {
    name: `Displacement Immunity (Size ≤ Self)`,
    description: `Immune to Push and Throw from models of equal/lesser Size`,
    cost: 12,
    category: `utility`,
    canTakeMultiple: false,
  },
  increaseVsDisplacementSize1: {
    name: `Increase vs Displacement Size (+1)`,
    description: `+1 size vs push/throw`,
    cost: 5,
    category: `defense`,
    canTakeMultiple: false,
  },
  increaseVsDisplacementSize2: {
    name: `Increase vs Displacement Size (+2)`,
    description: `+2 size vs push/throw`,
    cost: 8,
    category: `defense`,
    canTakeMultiple: false,
  },
  increaseForDisplacementSize1: {
    name: `Increase For Displacement Size (+1)`,
    description: `+1 size for push/throw`,
    cost: 7,
    category: `offense`,
    canTakeMultiple: false,
  },
  increaseForDisplacementSize2: {
    name: `Increase For Displacement Size (+2)`,
    description: `+2 size for push/throw`,
    cost: 4,
    category: `offense`,
    canTakeMultiple: false,
  },
  increaseCoverBonus: {
    name: `Increase Cover Bonus`,
    description: `Increase cover bonus by +1`,
    cost: 6,
    category: `defense`,
    canTakeMultiple: false,
  },
};

export const traitsTable = {
  type: `table`,
  title: `Traits`,
  description: `Always-on effects that define a model's inherent capabilities. Traits are always in effect and do not require activation.`,
  headers: [`Ability`, `Description`, `Cost`],
  computeRows: () => {
    const rows = [];

    // Group abilities by category for better organization
    const categories = {};
    Object.entries(TRAITS).forEach(([_key, ability]) => {
      if (!categories[ability.category]) {
        categories[ability.category] = [];
      }
      categories[ability.category].push(ability);
    });

    Object.entries(categories).forEach(([categoryName, abilities]) => {
      // Add category header
      rows.push([`**${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}**`, ``, ``]);

      // Add abilities in this category
      abilities.forEach((ability) => {
        rows.push([
          ability.name,
          ability.description,
          `${ability.cost} points`,
        ]);
      });

      // Add spacing between categories
      rows.push([``, ``, ``]);
    });

    // Remove last empty row
    if (rows.length > 0 && rows[rows.length - 1][0] === ``) {
      rows.pop();
    }

    return rows;
  },
};
