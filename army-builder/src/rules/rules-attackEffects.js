import { SUIT_SYMBOLS, GAME_SYMBOLS } from './symbols.js';

const createSuitCombos = (base, twoSuit, oneSuit) => ({
  [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}`]: base + 2,
  [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.FAILURE}`]: base + 3,
  [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: base + 4,
  [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}`]: base,
  [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.FAILURE}`]: base + 1,
  [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: base + 2,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}`]: twoSuit,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.FAILURE}`]: twoSuit + 1,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: twoSuit + 2,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}`]: oneSuit,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.FAILURE}`]: oneSuit + 1,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: oneSuit + 2,
});

export const ATTACK_EFFECTS = {
  movement: {
    category: `Movement Effects`,
    effects: {
      displaceAttacker: {
        name: `Displace Attacker`,
        description: `Move attacker within 1" of target`,
        costs: createSuitCombos(4, 2, 1),
      },
      displaceDefender: {
        name: `Displace Defender`,
        description: `Place target within 1" of original position`,
        costs: createSuitCombos(8, 4, 2),
      },
      knockback: {
        name: `Knockback`,
        description: `Push target 1" directly away`,
        costs: createSuitCombos(2, 1, 0),
      },
      throw: {
        name: `Throw`,
        description: `Throw target if at least 2 sizes smaller`,
        costs: createSuitCombos(8, 4, 2),
      },
    },
  },
  temporary: {
    category: `Temporary Effects`,
    effects: {
      hinder: {
        name: `Hinder`,
        description: `Add 1 Hinder Token to the Defender`,
        costs: createSuitCombos(2, 1, 0),
      },
      slow: {
        name: `Slow`,
        description: `Add 1 Slow Token to the Defender`,
        costs: createSuitCombos(3, 2, 1),
      },
      weaken: {
        name: `Weaken`,
        description: `Add 1 Weaken Token to the Defender`,
        costs: createSuitCombos(2, 1, 0),
      },
    },
  },
  other: {
    category: `Other Effects`,
    effects: {
      damageOverTime: {
        name: `Damage Over Time`,
        description: `Add 1 Damage Over Time Token to the Defender`,
        costs: createSuitCombos(3, 2, 1),
      },
      nullStrike: {
        name: `Null Strike`,
        description: `No damage dealt`,
        costs: {
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}`]: -6,
        },
      },
      exhaust: {
        name: `Exhaust`,
        description: `Add 1 of your Exhaust Token to 1 of the Defender's Actions`,
        costs: {
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}`]: 22,
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.FAILURE}`]: 25,
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: 28,
          [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}`]: 11,
          [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.FAILURE}`]: 14,
          [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: 17,
          [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}`]: 8,
          [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.FAILURE}`]: 11,
          [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: 14,
        },
      },
    },
  },
};

export function generateAttackEffectsTables() {
  const tables = [];

  Object.entries(ATTACK_EFFECTS).forEach(([_categoryKey, category]) => {
    // Add category section
    tables.push({
      name: category.category,
      description: `Attack effects in the ${category.category} category.`,
    });

    // Create individual tables for each effect
    Object.entries(category.effects).forEach(([_effectKey, effect]) => {
      const effectTable = {
        type: `table`,
        title: effect.name,
        description: effect.description,
        headers: [`Trigger`, `Cost`],
        computeRows: () => {
          const rows = [];
          const costEntries = Object.entries(effect.costs || {});

          costEntries.forEach(([trigger, cost]) => {
            rows.push([trigger, `${cost} points`]);
          });

          return rows;
        },
      };

      tables.push(effectTable);
    });
  });

  return tables;
};

/**
 * Calculate the maximum number of effects allowed for an attack based on Attack Skill
 * Rule: Attacks can have 1 effect per 2 Attack Skill points (minimum 1 effect if Attack Skill ≥ 0)
 * Attack Skill 0-2: 1 effect, Attack Skill 3-4: 2 effects, Attack Skill 5-6: 3 effects, etc.
 * @param {number} attackSkill - The base, unmodified Attack Skill value
 * @returns {number} Maximum number of effects allowed
 */
export function calculateMaxAttackEffects(attackSkill) {
  if (attackSkill < 0) {
    return 0;
  }

  // Special handling for the specific groupings you want
  if (attackSkill <= 2) return 1;
  if (attackSkill <= 4) return 2;
  if (attackSkill <= 6) return 3;
  if (attackSkill <= 8) return 4;

  // For higher attack skills, continue the pattern: every 2 points = 1 more effect
  return Math.floor((attackSkill - 3) / 2) + 2;
}

/**
 * Check if more effects can be added to an attack
 * @param {number} attackSkill - The base, unmodified Attack Skill value
 * @param {number} currentEffectCount - Current number of effects selected
 * @returns {boolean} True if more effects can be added
 */
export function canAddMoreAttackEffects(attackSkill, currentEffectCount) {
  const maxEffects = calculateMaxAttackEffects(attackSkill);
  return currentEffectCount < maxEffects;
}

/**
 * Get effect limit information for display purposes
 * @param {number} attackSkill - The base, unmodified Attack Skill value
 * @param {number} currentEffectCount - Current number of effects selected
 * @returns {object} Object containing limit info for UI display
 */
export function getAttackEffectLimitInfo(attackSkill, currentEffectCount) {
  const maxEffects = calculateMaxAttackEffects(attackSkill);
  const atLimit = currentEffectCount >= maxEffects;

  return {
    attackSkill,
    maxEffects,
    currentEffectCount,
    atLimit,
    canAddMore: !atLimit,
    rule: `Attacks can have 1 effect per 2 Attack Skill points (minimum 1 effect if Attack Skill ≥ 0).`,
  };
}
