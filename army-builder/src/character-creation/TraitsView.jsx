import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TRAITS } from "@/rules/rules-traits";
import {
  groupActionsByCategory,
  getFilteredActions,
  getCategoryOptions,
  handleCustomNameChange,
  clearCustomName,
  renderActionDetails,
} from "./actionViewHelpers";

const classNames = {
  container: `bg-white rounded-lg p-4 flex flex-col gap-6 text-black`,
  title: `text-lg font-semibold`,
  description: `flex flex-col gap-2 text-sm text-gray-600`,
  section: `flex flex-col gap-2`,
  label: `font-medium`,
  input: `border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50`,
  categoryFilter: `flex gap-2 mb-4`,
  categoryButton: `px-3 py-1 rounded border transition-colors`,
  categoryButtonActive: `bg-green-500 text-white border-green-500`,
  categoryButtonInactive: `bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200`,
  actionGrid: `grid gap-3`,
  actionCard: `border rounded-lg p-4 bg-gray-50`,
  actionHeader: `flex justify-between items-start mb-2`,
  actionName: `font-medium text-gray-900`,
  actionCost: `text-lg font-bold text-green-600`,
  actionDescription: `text-sm text-gray-600 mb-3`,
  actionDetails: `text-xs text-gray-500 space-y-1`,
  customNameSection: `mt-3`,
  customNameLabel: `block text-sm font-medium text-gray-700 mb-1`,
  customNameInput: `w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500`,
  addButton: `bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors`,
  addButtonDisabled: `bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed`,
  rules: `bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm text-green-800`,
  limitWarning: `bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-yellow-800`,
};

export default function TraitsView({ onAddTrait }) {
  const [selectedCategory, setSelectedCategory] = useState(`all`);
  const [customNames, setCustomNames] = useState({});

  // Group traits by category using shared helper
  const groupedTraits = groupActionsByCategory(TRAITS);
  const categories = getCategoryOptions(groupedTraits);

  // Filter traits based on selected category using shared helper
  const filteredTraits = getFilteredActions(
    TRAITS,
    groupedTraits,
    selectedCategory,
  );

  const handleAddTrait = (traitKey, trait) => {
    if (!onAddTrait) return;

    const customName = customNames[traitKey]?.trim();

    const traitData = {
      id: uuidv4(),
      type: `trait`,
      subType: `trait`,
      name: customName || trait.name,
      description: trait.description,
      cost: trait.cost,
      category: trait.category,
    };

    onAddTrait(traitData);

    // Clear custom name after adding using shared helper
    clearCustomName(setCustomNames, traitKey);
  };

  const renderTraitDetails = (trait) => {
    return renderActionDetails(trait, [`category`]);
  };

  const renderRulesSection = () => {
    return (
      <div className={classNames.rules}>
        <div className="mb-2">
          <strong>Trait Rules:</strong>
        </div>
        <div className="space-y-1">
          <p>• Custom names are optional and help personalize your character</p>
          <p>• Traits are passive abilities that are always active</p>
          <p>• Each trait can only be purchased once per character</p>
        </div>
      </div>
    );
  };

  return (
    <div className={classNames.container}>
      <h1 className={classNames.title}>Add Trait</h1>

      <div className={classNames.description}>
        <p>
          Traits are passive abilities that provide permanent bonuses or special rules.
        </p>
      </div>

      {renderRulesSection()}

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

      {/* Traits List */}
      <div className={classNames.section}>
        <div className={classNames.label}>
          Available Traits
          {selectedCategory !== `all` && ` (${selectedCategory})`}
        </div>
        <div className={classNames.actionGrid}>
          {filteredTraits.map((trait) => {
            const details = renderTraitDetails(trait);

            return (
              <div key={trait.key} className={classNames.actionCard}>
                <div className={classNames.actionHeader}>
                  <h4 className={classNames.actionName}>{trait.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={classNames.actionCost}>{trait.cost}</span>
                    <button
                      onClick={() => handleAddTrait(trait.key, trait)}
                      className={classNames.addButton}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <p className={classNames.actionDescription}>{trait.description}</p>

                {details.length > 0 && (
                  <div className={classNames.actionDetails}>
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
                  <label htmlFor={`custom-name-${trait.key}`} className={classNames.customNameLabel}>
                    Custom Name (optional):
                  </label>
                  <input
                    type="text"
                    id={`custom-name-${trait.key}`}
                    placeholder={`e.g., "Tough Skin" (default: ${trait.name})`}
                    value={customNames[trait.key] || ``}
                    onChange={e => handleCustomNameChange(
                      setCustomNames,
                      trait.key,
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

      {filteredTraits.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No traits found in the selected category.
        </div>
      )}
    </div>
  );
}
