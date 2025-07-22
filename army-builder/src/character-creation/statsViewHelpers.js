/**
 * Helper functions for StatsView component.
 * Handles stat cost calculations and upgrade logic.
 */

import { STAT_COSTS_AND_MAX, BASE_STATS_TABLE } from "@/rules/rules-stats";

/**
 * Gets the base stats data for a given character size.
 * @param {Object} size - Character size object
 * @returns {Object|null} Base stats data or null if not found
 */
export function getSizeData(size) {
  if (!size?.value) return null;
  return BASE_STATS_TABLE.find(row => row.value === size.value);
}

/**
 * Calculates the total cost of all pending stat upgrades.
 * @param {Object} pendingStats - Object with pending stat values
 * @param {Object} sizeData - Base stats data from size
 * @param {Object} characterSize - Character size object
 * @returns {number} Total cost
 */
export function calculateTotalStatsCost(pendingStats, sizeData, characterSize) {
  if (!sizeData) return 0;

  let totalCost = 0;

  // Calculate wounds cost
  const woundsBase = sizeData.wounds || 0;
  if (pendingStats.wounds > woundsBase) {
    const woundsUpgrades = pendingStats.wounds - woundsBase;
    for (let i = 0; i < woundsUpgrades; i++) {
      totalCost += STAT_COSTS_AND_MAX.wounds.costs[i] || 0;
    }
  }

  // Calculate defense cost
  const defenseBase = sizeData.defense || 0;
  if (pendingStats.defense > defenseBase) {
    const defenseUpgrades = pendingStats.defense - defenseBase;
    for (let i = 0; i < defenseUpgrades; i++) {
      totalCost += STAT_COSTS_AND_MAX.defense.costs[i] || 0;
    }
  }

  // Calculate attack skill cost
  const attackSkillBase = sizeData.attackSkill || 0;
  if (pendingStats.attackSkill > attackSkillBase) {
    const attackSkillUpgrades = pendingStats.attackSkill - attackSkillBase;
    for (let i = 0; i < attackSkillUpgrades; i++) {
      totalCost += STAT_COSTS_AND_MAX.attackSkill.costs[i] || 0;
    }
  }

  // Calculate strides cost
  const stridesBase = sizeData.strides || 0;
  if (pendingStats.strides > stridesBase) {
    const stridesUpgrades = pendingStats.strides - stridesBase;
    const costPerStride = STAT_COSTS_AND_MAX.strides.costs[characterSize?.value]
      || STAT_COSTS_AND_MAX.strides.costs[1];
    totalCost += stridesUpgrades * costPerStride;
  }

  return totalCost;
}

/**
 * Calculates upgrade costs and options for a specific stat.
 * @param {string} statKey - The stat key (wounds, defense, attackSkill, strides)
 * @param {number} currentValue - Current pending value for the stat
 * @param {Object} sizeData - Base stats data from size
 * @param {Object} characterSize - Character size object
 * @returns {Object} Object with rule, baseValue, and costs array
 */
export function calculateUpgradeCosts(statKey, currentValue, sizeData, characterSize) {
  const rule = STAT_COSTS_AND_MAX[statKey];
  const costs = [];

  if (!rule || !sizeData) {
    return { rule: null, baseValue: 0, costs: [] };
  }

  // Get base value from sizeData
  const baseValue = sizeData[rule.baseValue] || 0;

  // Calculate costs based on cost type
  if (rule.costType === `progressive`) {
    let cumulativeCost = 0;

    for (let i = 0; i < rule.maxUpgrades; i++) {
      const level = i + 1;
      const incrementalCost = rule.costs[i];
      cumulativeCost += incrementalCost;

      const finalValue = baseValue + level;

      costs.push({
        level,
        finalValue,
        incrementalCost,
        cumulativeCost,
        isSelected: currentValue === finalValue,
        label: `${rule.name} ${finalValue} (+${level})`,
      });
    }
  }
  else if (rule.costType === `size-based`) {
    const costPerUpgrade = rule.costs[characterSize?.value] || rule.costs[1];

    for (let i = 0; i < rule.maxUpgrades; i++) {
      const level = i + 1;
      const incrementalCost = costPerUpgrade;
      const cumulativeCost = costPerUpgrade * level;

      const finalValue = baseValue + level;

      costs.push({
        level,
        finalValue,
        incrementalCost,
        cumulativeCost,
        isSelected: currentValue === finalValue,
        label: `+${level} ${rule.name}${level > 1 ? `s` : ``} (Total: ${finalValue})`,
      });
    }
  }

  return { rule, baseValue, costs };
}

/**
 * Checks if there are any pending changes compared to current character stats.
 * @param {Object} pendingStats - Pending stat values
 * @param {Object} characterStats - Current character stats
 * @returns {boolean} True if there are changes
 */
export function hasStatChanges(pendingStats, characterStats) {
  return pendingStats.wounds !== (characterStats?.wounds || 0)
    || pendingStats.defense !== (characterStats?.defense || 0)
    || pendingStats.attackSkill !== (characterStats?.attackSkill || 0)
    || pendingStats.strides !== (characterStats?.strides || 0);
}
