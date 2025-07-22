/**
 * Character cost calculation utilities.
 * Handles dynamic cost calculations for characters and actions.
 */

import { CURRENT_CHARACTER_VERSION } from './rules-characterCreationVersion';
import { BASE_STATS_TABLE } from './rules-stats';

/**
 * Calculates the total cost of a character dynamically.
 * @param {Object} character - Character object
 * @returns {number} Total character cost
 */
export function calculateTotalCost(character) {
  const sizeCost = calculateSizeCost(character.size);
  const statsCost = calculateStatsCost(character.stats, character.size);
  const actionsCost = calculateActionsCost(character);

  return sizeCost + statsCost + actionsCost;
}

/**
 * Calculates the cost for a character's size.
 * @param {Object} size - Size object with value and mm
 * @returns {number} Size cost
 */
export function calculateSizeCost(size) {
  if (!size || size.value === undefined) return 0;

  // Find the size data from the BASE_STATS_TABLE
  const sizeData = BASE_STATS_TABLE.find(row => row.value === size.value);
  if (!sizeData) return 0;

  return sizeData.sizeCost;
}

/**
 * Calculates the cost for character stats modifications.
 * @param {Object} stats - Stats object
 * @param {Object} size - Size object to get base stats
 * @returns {number} Stats cost
 */
export function calculateStatsCost(stats, size) {
  if (!stats || !size) return 0;

  // Import here to avoid circular dependency
  const { STAT_COSTS_AND_MAX } = require(`./rules-stats`);

  // Find the base stats for this size
  const sizeData = BASE_STATS_TABLE.find(row => row.value === size.value);
  if (!sizeData) return 0;

  let totalCost = 0;

  // Calculate wounds cost
  const woundsBase = sizeData.wounds || 0;
  const currentWounds = stats.wounds || woundsBase;
  if (currentWounds > woundsBase) {
    const woundsUpgrades = currentWounds - woundsBase;
    for (let i = 0; i < woundsUpgrades; i++) {
      if (STAT_COSTS_AND_MAX.wounds.costs[i]) {
        totalCost += STAT_COSTS_AND_MAX.wounds.costs[i];
      }
    }
  }

  // Calculate defense cost
  const defenseBase = sizeData.defense || 0;
  const currentDefense = stats.defense || defenseBase;
  if (currentDefense > defenseBase) {
    const defenseUpgrades = currentDefense - defenseBase;
    for (let i = 0; i < defenseUpgrades; i++) {
      if (STAT_COSTS_AND_MAX.defense.costs[i]) {
        totalCost += STAT_COSTS_AND_MAX.defense.costs[i];
      }
    }
  }

  // Calculate attack skill cost
  const attackSkillBase = sizeData.attackSkill || 0;
  const currentAttackSkill = stats.attackSkill || attackSkillBase;
  if (currentAttackSkill > attackSkillBase) {
    const attackSkillUpgrades = currentAttackSkill - attackSkillBase;
    for (let i = 0; i < attackSkillUpgrades; i++) {
      if (STAT_COSTS_AND_MAX.attackSkill.costs[i]) {
        totalCost += STAT_COSTS_AND_MAX.attackSkill.costs[i];
      }
    }
  }

  // Calculate strides cost
  const stridesBase = sizeData.strides || 0;
  const currentStrides = stats.strides || stridesBase;
  if (currentStrides > stridesBase) {
    const stridesUpgrades = currentStrides - stridesBase;
    const costPerStride = STAT_COSTS_AND_MAX.strides.costs[size.value]
      || STAT_COSTS_AND_MAX.strides.costs[1];
    totalCost += stridesUpgrades * costPerStride;
  }

  return totalCost;
}

/**
 * Calculates the total cost of all actions.
 * @param {Object} character - Character object
 * @returns {number} Total actions cost
 */
export function calculateActionsCost(character) {
  const allActions = [
    ...character.attackActions,
    ...character.abilityActions,
    ...character.responseActions,
    ...character.traits,
  ];

  return allActions.reduce((total, action) => {
    return total + calculateActionCost(action);
  }, 0);
}

/**
 * Calculates the cost of a single action.
 * @param {Object} action - Action object
 * @returns {number} Action cost
 */
export function calculateActionCost(action) {
  if (!action || !action.type) return 0;

  // If the action has a calculated cost, use it
  if (action.cost !== undefined && action.cost !== null) {
    return action.cost;
  }

  // Fallback to basic cost based on action type for legacy actions
  switch (action.type) {
    case `attack`:
      return 15;
    case `ability`:
      return 12;
    case `response`:
      return 8;
    case `trait`:
      return 5;
    default:
      return 0;
  }
}

/**
 * Calculates action tokens for a character.
 * @param {Object} character - Character object
 * @returns {number} Total action tokens
 */
export function calculateActionTokens(character) {
  return (character.attackActions?.length || 0)
    + (character.abilityActions?.length || 0)
    + (character.responseActions?.length || 0);
}

/**
 * Updates a character to the current rule version if needed.
 * @param {Object} character - Character object
 * @returns {Object} Character with updated version
 */
export function updateCharacterToCurrentVersion(character) {
  if (character.version === CURRENT_CHARACTER_VERSION) {
    return character;
  }

  // TODO: Implement actual version migration logic
  // For now, just update the version
  return {
    ...character,
    version: CURRENT_CHARACTER_VERSION,
  };
}
