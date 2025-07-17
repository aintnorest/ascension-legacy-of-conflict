import React, { useState } from "react";
import { STAT_COSTS_AND_MAX, BASE_STATS_TABLE } from "@/rulesLogic";

export default function StatsView({
  attackSkill,
  defense,
  size,
  statsCost,
  strides,
  updateBaseStats,
  wounds,
}) {
  // Local state for pending changes
  const [pendingWounds, setPendingWounds] = useState(wounds);
  const [pendingDefense, setPendingDefense] = useState(defense);
  const [pendingAttackSkill, setPendingAttackSkill] = useState(attackSkill);
  const [pendingStrides, setPendingStrides] = useState(strides);

  // Get base stats from size
  const sizeData = BASE_STATS_TABLE.find(row => row.value === size);

  // Calculate total cost of all pending upgrades
  const calculateTotalCost = () => {
    let totalCost = 0;
    
    // Calculate wounds cost
    const woundsBase = sizeData?.wounds || 0;
    if (pendingWounds > woundsBase) {
      const woundsUpgrades = pendingWounds - woundsBase;
      let woundsCost = 0;
      for (let i = 0; i < woundsUpgrades; i++) {
        woundsCost += STAT_COSTS_AND_MAX.wounds.costs[i];
      }
      totalCost += woundsCost;
    }
    
    // Calculate defense cost
    const defenseBase = sizeData?.defense || 0;
    if (pendingDefense > defenseBase) {
      const defenseUpgrades = pendingDefense - defenseBase;
      let defenseCost = 0;
      for (let i = 0; i < defenseUpgrades; i++) {
        defenseCost += STAT_COSTS_AND_MAX.defense.costs[i];
      }
      totalCost += defenseCost;
    }
    
    // Calculate attack skill cost
    const attackSkillBase = sizeData?.attackSkill || 0;
    if (pendingAttackSkill > attackSkillBase) {
      const attackSkillUpgrades = pendingAttackSkill - attackSkillBase;
      let attackSkillCost = 0;
      for (let i = 0; i < attackSkillUpgrades; i++) {
        attackSkillCost += STAT_COSTS_AND_MAX.attackSkill.costs[i];
      }
      totalCost += attackSkillCost;
    }
    
    // Calculate strides cost
    const stridesBase = sizeData?.strides || 0;
    if (pendingStrides > stridesBase) {
      const stridesUpgrades = pendingStrides - stridesBase;
      const costPerStride = STAT_COSTS_AND_MAX.strides.costs[size] || STAT_COSTS_AND_MAX.strides.costs[1];
      totalCost += stridesUpgrades * costPerStride;
    }
    
    return totalCost;
  };

  // Handle updating all stats
  const handleUpdate = () => {
    const totalCost = calculateTotalCost();
    updateBaseStats({
      wounds: pendingWounds,
      defense: pendingDefense,
      attackSkill: pendingAttackSkill,
      strides: pendingStrides,
      cost: totalCost
    });
  };

  // Reset pending values to current values
  const handleReset = () => {
    setPendingWounds(wounds);
    setPendingDefense(defense);
    setPendingAttackSkill(attackSkill);
    setPendingStrides(strides);
  };

  // Generic function to calculate upgrade costs for any stat
  const calculateUpgradeCosts = (statKey, currentValue) => {
    const rule = STAT_COSTS_AND_MAX[statKey];
    const costs = [];
    
    // Get base value from sizeData
    const baseValue = sizeData?.[rule.baseValue] || 0;

    // Calculate costs based on cost type
    if (rule.costType === 'progressive') {
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
          label: `${rule.name} ${finalValue} (+${level})`
        });
      }
    } else if (rule.costType === 'size-based') {
      const costPerUpgrade = rule.costs[size] || rule.costs[1];
      
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
          label: `+${level} ${rule.name}${level > 1 ? 's' : ''} (Total: ${finalValue})`
        });
      }
    }
    
    return { rule, baseValue, costs };
  };

  // Calculate costs for all stats using pending values
  const woundsData = calculateUpgradeCosts('wounds', pendingWounds);
  const defenseData = calculateUpgradeCosts('defense', pendingDefense);
  const attackSkillData = calculateUpgradeCosts('attackSkill', pendingAttackSkill);
  const stridesData = calculateUpgradeCosts('strides', pendingStrides);

  // Handle clicking on an upgrade option
  const handleStatClick = (statKey, finalValue) => {
    switch (statKey) {
      case 'wounds':
        setPendingWounds(finalValue);
        break;
      case 'defense':
        setPendingDefense(finalValue);
        break;
      case 'attackSkill':
        setPendingAttackSkill(finalValue);
        break;
      case 'strides':
        setPendingStrides(finalValue);
        break;
    }
  };

  // Render a stat section
  const renderStatSection = (statData, statKey) => {
    const { rule, baseValue, costs } = statData;
    const currentValue = statData.currentValue || baseValue;
    
    return (
      <div key={rule.name} className="flex flex-col gap-3">
        <h2 className="text-md font-semibold flex items-center gap-2">
          <span>{rule.icon}</span>
          {rule.name} (Base: {baseValue}, Current: {currentValue})
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {/* Base stat option */}
          <div 
            onClick={() => handleStatClick(statKey, baseValue)}
            className={`p-3 border rounded cursor-pointer hover:bg-blue-50 ${
              currentValue === baseValue ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>Base {rule.name} {baseValue}</span>
              <span className="font-semibold">0 pts</span>
            </div>
          </div>
          
          {/* Upgrade options */}
          {costs.map((cost) => (
            <div 
              key={cost.level}
              onClick={() => handleStatClick(statKey, cost.finalValue)}
              className={`p-3 border rounded cursor-pointer hover:bg-blue-50 ${
                cost.isSelected ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{cost.label}</span>
                <span className="font-semibold">
                  {cost.incrementalCost} pts ({cost.cumulativeCost} total)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const totalCost = calculateTotalCost();
  const hasChanges = 
    pendingWounds !== wounds ||
    pendingDefense !== defense ||
    pendingAttackSkill !== attackSkill ||
    pendingStrides !== strides;

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-6 text-black">
      <h1 className="text-lg font-semibold">Edit Base Stats</h1>
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        This section details how to improve a model's fundamental statistics: Wounds, Defense, Attack Skill, and Strides. Points spent here increase the corresponding stat.
      </div>
      
      {renderStatSection({ ...woundsData, currentValue: pendingWounds }, 'wounds')}
      {renderStatSection({ ...defenseData, currentValue: pendingDefense }, 'defense')}
      {renderStatSection({ ...attackSkillData, currentValue: pendingAttackSkill }, 'attackSkill')}
      {renderStatSection({ ...stridesData, currentValue: pendingStrides }, 'strides')}
      
      {/* Action buttons and cost summary */}
      <div className="flex flex-col gap-4 pt-4 border-t">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Cost:</span>
          <span>{totalCost} points</span>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            disabled={!hasChanges}
            className={`flex-1 py-3 px-4 rounded font-semibold ${
              hasChanges
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Update Stats
          </button>
          
          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className={`py-3 px-4 rounded font-semibold ${
              hasChanges
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
