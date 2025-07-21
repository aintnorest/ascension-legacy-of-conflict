export const TRAITS = {
  grantDefenseBonus: {
    name: `Grant Defense Bonus (Aura, 2")`,
    description: `Friendly models within 2" gain +1 Defense`,
    cost: 10,
    category: `aura`,
    range: `2"`,
    effect: `+1 Defense to allies`,
  },
  reduceWoundTaken1: {
    name: `Reduce Wound Taken (Min 1)`,
    description: `Reduces all incoming damage by 1 (min 1)`,
    cost: 15,
    category: `defense`,
    effect: `Damage reduction -1 (min 1)`,
  },
  reduceWoundTaken2: {
    name: `Reduce Wound Taken (Min 2)`,
    description: `Reduces all incoming damage by 2 (min 2)`,
    cost: 16,
    category: `defense`,
    effect: `Damage reduction -2 (min 2)`,
  },
  displacementImmunity: {
    name: `Displacement Immunity (Size ≤ Self)`,
    description: `Immune to Push and Throw from models of equal/lesser Size`,
    cost: 12,
    category: `immunity`,
    effect: `Immunity to displacement from equal/smaller models`,
  },
  regenerateSelf: {
    name: `Regenerate Self (End of Activation)`,
    description: `At end of activation, heal 1 Wound if no active DOT`,
    cost: 12,
    category: `healing`,
    timing: `end of activation`,
    condition: `no active DOT`,
  },
  increaseDisplacementSize2: {
    name: `Increase Displacement Size (+2)`,
    description: `+2 size vs push/throw`,
    cost: 10,
    category: `defense`,
    effect: `+2 effective size vs displacement`,
  },
  attackBonusVsLarge: {
    name: `Attack Bonus vs Large (Size 3+)`,
    description: `+1 to Attack Skill when targeting models with Size 3+`,
    cost: 5,
    category: `offense`,
    effect: `+1 Attack Skill vs Size 3+ targets`,
  },
  ignoreClimbPenalty: {
    name: `Ignore Climb Penalty`,
    description: `Ignores extra Stride cost for Climbing (R-5.2.4)`,
    cost: 6,
    category: `movement`,
    effect: `No climbing movement penalty`,
  },
  ignoreMovementPenalties: {
    name: `Ignore Movement Penalties`,
    description: `Ignores all movement penalties except the Slow condition`,
    cost: 9,
    category: `movement`,
    effect: `Ignore movement penalties (except Slow)`,
  },
  defenseBonusVsRanged: {
    name: `Defense Bonus vs Ranged`,
    description: `+2 defense vs ranged attacks`,
    cost: 6,
    category: `defense`,
    effect: `+2 Defense vs ranged attacks`,
  },
  attackPenaltyAura: {
    name: `Attack Penalty Aura (2"+Influence)`,
    description: `-1 to attacks within 2"+influence`,
    cost: 5,
    category: `aura`,
    range: `2"+influence`,
    effect: `-1 to enemy attacks in range`,
  },
  attackBonusIfStationary: {
    name: `Attack Bonus If Stationary`,
    description: `+2 to attack if no move action this turn`,
    cost: 8,
    category: `offense`,
    condition: `no movement this turn`,
    effect: `+2 Attack Skill when stationary`,
  },
  attackPenaltyVsDistant: {
    name: `Attack Penalty vs Distant (6"+)`,
    description: `-2 to attacks from beyond 6"`,
    cost: 8,
    category: `defense`,
    effect: `-2 to incoming attacks from 6"+ range`,
  },
  increaseVsDisplacementSize2: {
    name: `Increase vs Displacement Size (+2)`,
    description: `+2 size vs push/throw`,
    cost: 8,
    category: `defense`,
    effect: `+2 effective size vs displacement`,
  },
  alwaysPartialCover: {
    name: `Always Partial Cover`,
    description: `Always benefits from Partial Cover (R-6.2.2)`,
    cost: 7,
    category: `defense`,
    effect: `Permanent Partial Cover benefit`,
  },
  increaseForDisplacementSize1: {
    name: `Increase For Displacement Size (+1)`,
    description: `+1 size for push/throw`,
    cost: 6,
    category: `offense`,
    effect: `+1 effective size when displacing others`,
  },
  increaseCoverBonus: {
    name: `Increase Cover Bonus`,
    description: `Increase cover +1`,
    cost: 6,
    category: `defense`,
    effect: `+1 to all cover bonuses`,
  },
  increaseVsDisplacementSize1: {
    name: `Increase vs Displacement Size (+1)`,
    description: `+1 size vs push/throw`,
    cost: 4,
    category: `defense`,
    effect: `+1 effective size vs displacement`,
  },
  ignoreObscuredStealth: {
    name: `Ignore Obscured/Stealth`,
    description: `Ignores Obscured terrain (R-6.2.2) and enemy Stealth Field`,
    cost: 9,
    category: `utility`,
    effect: `Ignore Obscured terrain and Stealth`,
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
