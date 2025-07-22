import React, { useState } from "react";
import {
  getSizeData,
  calculateTotalStatsCost,
  calculateUpgradeCosts,
  hasStatChanges,
} from "./statsViewHelpers";

const classNames = {
  container: `bg-white rounded-lg p-4 flex flex-col gap-6 text-black`,
  title: `text-lg font-semibold`,
  description: `flex flex-col gap-2 text-sm text-gray-600`,
  statSection: `flex flex-col gap-3`,
  statHeader: `text-md font-semibold flex items-center gap-2`,
  statGrid: `grid grid-cols-1 gap-2`,
  statOption: `p-3 border rounded cursor-pointer hover:bg-blue-50`,
  statOptionSelected: `bg-green-50 border-green-300`,
  statOptionDefault: `bg-gray-50 border-gray-300`,
  statOptionContent: `flex justify-between items-center`,
  costInfo: `font-semibold`,
  actionsContainer: `flex flex-col gap-4 pt-4 border-t`,
  costSummary: `flex justify-between items-center text-lg font-semibold`,
  buttonContainer: `flex gap-3`,
  button: `py-3 px-4 rounded font-semibold`,
  buttonPrimary: `flex-1 bg-blue-600 text-white hover:bg-blue-700`,
  buttonSecondary: `bg-gray-600 text-white hover:bg-gray-700`,
  buttonDisabled: `bg-gray-300 text-gray-500 cursor-not-allowed`,
};

export default function StatsView({
  character,
  onUpdateCharacter,
}) {
  // Local state for pending changes - extract current values from character.stats
  const [pendingWounds, setPendingWounds] = useState(character.stats?.wounds || 0);
  const [pendingDefense, setPendingDefense] = useState(character.stats?.defense || 0);
  const [pendingAttackSkill, setPendingAttackSkill] = useState(character.stats?.attackSkill || 0);
  const [pendingStrides, setPendingStrides] = useState(character.stats?.strides || 0);

  // Get base stats from size using helper
  const sizeData = getSizeData(character.size);

  // Create pending stats object for helper functions
  const pendingStats = {
    wounds: pendingWounds,
    defense: pendingDefense,
    attackSkill: pendingAttackSkill,
    strides: pendingStrides,
  };

  // Handle updating all stats
  const handleUpdate = () => {
    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        wounds: pendingWounds,
        defense: pendingDefense,
        attackSkill: pendingAttackSkill,
        strides: pendingStrides,
      },
    };
    onUpdateCharacter(updatedCharacter);
  };

  // Reset pending values to current values
  const handleReset = () => {
    setPendingWounds(character.stats?.wounds || 0);
    setPendingDefense(character.stats?.defense || 0);
    setPendingAttackSkill(character.stats?.attackSkill || 0);
    setPendingStrides(character.stats?.strides || 0);
  };

  // Handle clicking on an upgrade option
  const handleStatClick = (statKey, finalValue) => {
    switch (statKey) {
      case `wounds`:
        setPendingWounds(finalValue);
        break;
      case `defense`:
        setPendingDefense(finalValue);
        break;
      case `attackSkill`:
        setPendingAttackSkill(finalValue);
        break;
      case `strides`:
        setPendingStrides(finalValue);
        break;
    }
  };

  // Calculate costs for all stats using pending values and helper functions
  const woundsData = calculateUpgradeCosts(`wounds`, pendingWounds, sizeData, character.size);
  const defenseData = calculateUpgradeCosts(`defense`, pendingDefense, sizeData, character.size);
  const attackSkillData = calculateUpgradeCosts(`attackSkill`, pendingAttackSkill, sizeData, character.size);
  const stridesData = calculateUpgradeCosts(`strides`, pendingStrides, sizeData, character.size);

  // Render a stat section using classNames
  const renderStatSection = (statData, statKey) => {
    const { rule, baseValue, costs } = statData;
    const currentValue = statData.currentValue || baseValue;

    if (!rule) return null;

    return (
      <div key={rule.name} className={classNames.statSection}>
        <h2 className={classNames.statHeader}>
          <span>{rule.icon}</span>
          {rule.name}
          {` `}
          (Base:
          {` `}
          {baseValue}
          , Current:
          {` `}
          {currentValue}
          )
        </h2>
        <div className={classNames.statGrid}>
          {/* Base stat option */}
          <div
            onClick={() => handleStatClick(statKey, baseValue)}
            className={`${classNames.statOption} ${
              currentValue === baseValue
                ? classNames.statOptionSelected
                : classNames.statOptionDefault
            }`}
          >
            <div className={classNames.statOptionContent}>
              <span>
                Base
                {` `}
                {rule.name}
                {` `}
                {baseValue}
              </span>
              <span className={classNames.costInfo}>0 pts</span>
            </div>
          </div>

          {/* Upgrade options */}
          {costs.map(cost => (
            <div
              key={cost.level}
              onClick={() => handleStatClick(statKey, cost.finalValue)}
              className={`${classNames.statOption} ${
                cost.isSelected ? classNames.statOptionSelected : classNames.statOptionDefault
              }`}
            >
              <div className={classNames.statOptionContent}>
                <span>{cost.label}</span>
                <span className={classNames.costInfo}>
                  {cost.incrementalCost}
                  {` `}
                  pts (
                  {cost.cumulativeCost}
                  {` `}
                  total)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Use helper functions for calculations
  const totalCost = calculateTotalStatsCost(pendingStats, sizeData, character.size);
  const hasChanges = hasStatChanges(pendingStats, character.stats);

  return (
    <div className={classNames.container}>
      <h1 className={classNames.title}>Edit Base Stats</h1>
      <div className={classNames.description}>
        This section details how to improve a model&apos;s fundamental statistics:
        Wounds, Defense, Attack Skill, and Strides. Points spent here increase the
        corresponding stat.
      </div>

      {renderStatSection({ ...woundsData, currentValue: pendingWounds }, `wounds`)}
      {renderStatSection({ ...defenseData, currentValue: pendingDefense }, `defense`)}
      {renderStatSection({ ...attackSkillData, currentValue: pendingAttackSkill }, `attackSkill`)}
      {renderStatSection({ ...stridesData, currentValue: pendingStrides }, `strides`)}

      {/* Action buttons and cost summary */}
      <div className={classNames.actionsContainer}>
        <div className={classNames.costSummary}>
          <span>Total Cost:</span>
          <span>
            {totalCost}
            {` `}
            points
          </span>
        </div>

        <div className={classNames.buttonContainer}>
          <button
            onClick={handleUpdate}
            disabled={!hasChanges}
            className={`${classNames.button} ${
              hasChanges ? classNames.buttonPrimary : classNames.buttonDisabled
            }`}
          >
            Update Stats
          </button>

          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className={`${classNames.button} ${
              hasChanges ? classNames.buttonSecondary : classNames.buttonDisabled
            }`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
