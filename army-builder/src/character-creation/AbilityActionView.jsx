import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTION_ABILITIES } from "@/rules/rules-abilityActions";
import {
  groupActionsByCategory,
  getFilteredActions,
  getCategoryOptions,
  handleCustomNameChange,
  clearCustomName,
  renderActionDetails,
  getSharedActionViewClasses,
} from "./actionViewHelpers";

const classNames = getSharedActionViewClasses(`blue`);

export default function AbilityActionView({ onAddAbilityAction, character = {} }) {
  const [selectedCategory, setSelectedCategory] = useState(`all`);
  const [customNames, setCustomNames] = useState({});

  // Get existing ability actions from character
  const existingAbilities = character.abilityActions || [];
  const existingAbilityKeys = existingAbilities.map((ability) => {
    // Find the original key by matching name and cost
    const foundEntry = Object.entries(ACTION_ABILITIES).find(([, abilityDef]) =>
      abilityDef.name === ability.name && abilityDef.cost === ability.cost,
    );
    return foundEntry ? foundEntry[0] : null;
  }).filter(Boolean);

  // Group abilities by category using shared helper
  const groupedAbilities = groupActionsByCategory(ACTION_ABILITIES);
  const categories = getCategoryOptions(groupedAbilities);

  // Filter abilities based on selected category and availability using shared helper
  const filteredAbilities = getFilteredActions(
    ACTION_ABILITIES,
    groupedAbilities,
    selectedCategory,
  ).filter((ability) => {
    // Show ability if it can be taken multiple times OR if character doesn't already have it
    return ability.canTakeMultiple || !existingAbilityKeys.includes(ability.key);
  });

  const handleAddAbility = (abilityKey, ability) => {
    if (!onAddAbilityAction) return;

    const customName = customNames[abilityKey]?.trim();

    const abilityData = {
      id: uuidv4(),
      type: `action`,
      subType: `ability`,
      name: customName || ability.name,
      descriptions: ability.descriptions,
      cost: ability.cost,
      category: ability.category,
      targeting: ability.targeting,
      range: ability.range,
      requiresLOS: ability.requiresLOS,
      sizeRequirement: ability.sizeRequirement,
      canTakeMultiple: ability.canTakeMultiple,
    };

    onAddAbilityAction(abilityData);

    // Clear custom name after adding using shared helper
    clearCustomName(setCustomNames, abilityKey);
  };

  const renderAbilityDetails = (ability) => {
    return renderActionDetails(ability, [`targeting`, `range`, `requiresLOS`, `sizeRequirement`]);
  };

  return (
    <div className={classNames.container}>
      <h1 className={classNames.title}>Add Ability Action</h1>

      <div className={classNames.description}>
        <p>
          Select an ability action for your character.
        </p>
      </div>

      <div className={classNames.rules}>
        <strong>Ability Action Rules:</strong>
        <ul className="mt-1 space-y-1">
          <li>• Characters can only have one of each ability action unless specifically noted</li>
          <li>• Custom names are optional and help personalize your character</li>
          <li>• A character may only use one ability action per turn</li>
        </ul>
      </div>

      {/* Category Filter */}
      <div className={classNames.section}>
        <div className={classNames.label}>Filter by Category:</div>
        <div className={classNames.categoryFilter}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${classNames.categoryButton} ${
                selectedCategory === category
                  ? classNames.categoryButtonActive
                  : classNames.categoryButtonInactive
              }`}
            >
              {category === `all` ? `All` : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Abilities List */}
      <div className={classNames.section}>
        <div className={classNames.label}>
          Available Abilities
          {selectedCategory !== `all` && ` (${selectedCategory})`}
        </div>
        <div className={classNames.abilityGrid}>
          {filteredAbilities.map((ability) => {
            const details = renderAbilityDetails(ability);

            return (
              <div key={ability.key} className={classNames.abilityCard}>
                <div className={classNames.abilityHeader}>
                  <h4 className={classNames.abilityName}>{ability.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={classNames.abilityCost}>{ability.cost}</span>
                    <button
                      onClick={() => handleAddAbility(ability.key, ability)}
                      className={classNames.addButton}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className={classNames.abilityDescription}>
                  {ability.descriptions.map((desc, index) => (
                    <div key={index} className="mb-1">
                      <strong>{desc.symbol}</strong>
                      {` `}
                      {desc.description}
                    </div>
                  ))}
                </div>

                {ability.canTakeMultiple && (
                  <div className="text-xs text-green-600 font-medium mb-2">
                    ✓ Can be taken multiple times
                  </div>
                )}

                {details.length > 0 && (
                  <div className={classNames.abilityDetails}>
                    {details.map((detail, index) => (
                      <p key={index}>
                        •
                        {` `}
                        {detail}
                      </p>
                    ))}
                  </div>
                )}

                <div className={classNames.customNameSection}>
                  <label htmlFor={`custom-name-${ability.key}`} className={classNames.customNameLabel}>
                    Custom Name (optional):
                  </label>
                  <input
                    type="text"
                    id={`custom-name-${ability.key}`}
                    placeholder={`e.g., "Blink Step" (default: ${ability.name})`}
                    value={customNames[ability.key] || ``}
                    onChange={e => handleCustomNameChange(
                      setCustomNames,
                      ability.key,
                      e.target.value,
                    )}
                    className={classNames.customNameInput}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredAbilities.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No abilities found in the selected category.
        </div>
      )}
    </div>
  );
}
