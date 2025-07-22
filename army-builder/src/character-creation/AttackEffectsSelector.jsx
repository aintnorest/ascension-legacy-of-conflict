import React from "react";
import { ATTACK_EFFECTS } from "@/rules/rules-attackEffects";
import { createEffectObject } from "./attackActionHelpers";

const classNames = {
  effectsSection: `flex flex-col gap-4`,
  effectsTitle: `font-semibold`,
  selectedEffects: `flex flex-col gap-2`,
  selectedEffectsTitle: `font-medium`,
  effectItem: `flex items-center justify-between p-2 bg-green-50 border border-green-300 rounded`,
  removeButton: `text-red-600 hover:text-red-800`,
  effectCategory: `flex flex-col gap-2`,
  effectCategoryTitle: `font-medium`,
  effectCard: `border border-gray-300 rounded p-3`,
  effectName: `font-medium`,
  effectDesc: `text-sm text-gray-600 mb-2`,
  effectTriggers: `grid grid-cols-3 gap-1 text-xs`,
  triggerButton: `p-1 bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded text-center`,
  triggerButtonDisabled: `p-1 bg-gray-100 border border-gray-300 rounded text-center cursor-not-allowed`,
};

export default function AttackEffectsSelector({
  selectedEffects,
  onAddEffect,
  onRemoveEffect,
}) {
  // Handle adding an effect
  const handleAddEffect = (categoryKey, effectKey, triggerKey, cost) => {
    const newEffect = createEffectObject(categoryKey, effectKey, triggerKey, cost);
    onAddEffect(newEffect);
  };

  return (
    <div className={classNames.effectsSection}>
      <h3 className={classNames.effectsTitle}>Attack Effects</h3>

      {/* Selected Effects */}
      {selectedEffects.length > 0 && (
        <div className={classNames.selectedEffects}>
          <h4 className={classNames.selectedEffectsTitle}>Selected Effects:</h4>
          {selectedEffects.map((effect, index) => (
            <div key={index} className={classNames.effectItem}>
              <span>
                {effect.trigger}
                :
                {` `}
                {effect.description}
                {` (+`}
                {effect.cost}
                {` points)`}
              </span>
              <button
                onClick={() => onRemoveEffect(index)}
                className={classNames.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Effects */}
      <div className={classNames.effectsSection}>
        {Object.entries(ATTACK_EFFECTS).map(([categoryKey, category]) => (
          <div key={categoryKey} className={classNames.effectCategory}>
            <h4 className={classNames.effectCategoryTitle}>{category.category}</h4>
            {Object.entries(category.effects).map(([effectKey, effect]) => (
              <div key={effectKey} className={classNames.effectCard}>
                <div className={classNames.effectName}>{effect.name}</div>
                <div className={classNames.effectDesc}>{effect.description}</div>
                <div className={classNames.effectTriggers}>
                  {Object.entries(effect.costs || {}).map(([triggerKey, cost]) => (
                    <button
                      key={triggerKey}
                      onClick={() => handleAddEffect(categoryKey, effectKey, triggerKey, cost)}
                      className={
                        cost >= 0
                          ? classNames.triggerButton
                          : classNames.triggerButtonDisabled
                      }
                      disabled={cost < 0}
                    >
                      {triggerKey}
                      :
                      {` `}
                      {cost}
                      {` pts`}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
