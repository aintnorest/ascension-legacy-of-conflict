import React, { useState } from "react";
import { INSTANT_ABILITIES, PASSIVE_ABILITIES, ABILITY_RULES } from "@/rulesLogic";

export default function AbilityFacetView({
  existingFacets = [],
  onAddAbility = null,
}) {
  const [selectedCategory, setSelectedCategory] = useState("instant");
  const [customNames, setCustomNames] = useState({}); // Store custom names for each ability

  // Check how many of each ability type have been purchased
  const instantCount = existingFacets.filter(facet => facet.type === "instant").length;
  const passiveCount = existingFacets.filter(facet => facet.type === "passive").length;
  const canAddInstant = instantCount < ABILITY_RULES.shared.maxPurchases;
  const canAddPassive = passiveCount < ABILITY_RULES.shared.maxPurchases;

  // Helper function to get rule value by path (e.g., "shared.playerNaming")
  const getRuleValue = (rulePath) => {
    const [section, key] = rulePath.split('.');
    return ABILITY_RULES[section]?.[key];
  };

  // Helper function to get all applicable rules for an ability type
  const getApplicableRules = (abilityType) => {
    const rules = ABILITY_RULES[abilityType]?.rules || [];
    return rules.map(rulePath => ({
      path: rulePath,
      value: getRuleValue(rulePath)
    })).filter(rule => rule.value !== undefined);
  };

  // Component to display rules for an ability type
  const renderRulesSection = (abilityType, count, maxCount, isAtMax) => {
    const applicableRules = getApplicableRules(abilityType);
    const playerNamingRule = applicableRules.find(rule => rule.path === 'shared.playerNaming');
    const namingConventionRule = applicableRules.find(rule => rule.path === 'shared.namingConvention');
    const maxPurchasesRule = ABILITY_RULES.shared.maxPurchasesRule;
    
    // Get ability-specific rules that aren't in the rules array
    const abilityData = ABILITY_RULES[abilityType];
    const specificRules = Object.entries(abilityData)
      .filter(([key, value]) => key !== 'description' && key !== 'rules' && typeof value === 'string')
      .map(([key, value]) => ({ key, value }));

    return (
      <div>
        <h3 className="font-medium text-gray-900">
          {abilityType === 'instantAbilities' ? 'Instant Abilities' : 'Passive Abilities'}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {ABILITY_RULES[abilityType].description}
        </p>
        
        {/* Rules Display */}
        <div className="text-xs text-gray-500 mb-3 space-y-1">
          {maxPurchasesRule && (
            <p><span className="font-medium">Purchase Limit:</span> {maxPurchasesRule}</p>
          )}
          {specificRules.map(({ key, value }) => (
            <p key={key}>
              <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span> {value}
            </p>
          ))}
          {playerNamingRule && (
            <p className="italic">{playerNamingRule.value}</p>
          )}
          {namingConventionRule && (
            <p><span className="font-medium">Naming Convention:</span> {namingConventionRule.value}</p>
          )}
        </div>

        {isAtMax && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              Maximum {abilityType === 'instantAbilities' ? 'instant' : 'passive'} abilities reached ({count}/{maxCount}). You cannot purchase more {abilityType === 'instantAbilities' ? 'instant' : 'passive'} abilities.
            </p>
          </div>
        )}
      </div>
    );
  };

  const handleCustomNameChange = (abilityKey, value) => {
    setCustomNames(prev => ({
      ...prev,
      [abilityKey]: value
    }));
  };

  const handlePurchaseAbility = (abilityKey, ability, category) => {
    const canAdd = category === "instant" ? canAddInstant : canAddPassive;
    if (onAddAbility && canAdd) {
      const customName = customNames[abilityKey]?.trim();
      onAddAbility({
        type: category, // Use "instant" or "passive" directly as the type
        name: customName || ability.name, // Use custom name if provided, otherwise default
        ruleName: ability.name, // Always keep the original rule name for reference
        description: ability.description,
        cost: ability.cost,
        isPrimary: ability.cost >= 10, // Determine based on cost for facet ratio rules
        id: abilityKey,
        category: ability.category,
        ...(ability.targeting && { targeting: ability.targeting }),
        ...(ability.range && { range: ability.range }),
        ...(ability.effect && { effect: ability.effect })
      });
    }
  };

  const renderInstantAbilities = () => {
    const instantEntries = Object.entries(INSTANT_ABILITIES);

    return (
      <div className="space-y-4">
        {renderRulesSection('instantAbilities', instantCount, ABILITY_RULES.shared.maxPurchases, !canAddInstant)}
        <div className="grid gap-3">
          {instantEntries.map(([key, ability]) => (
            <div key={key} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{ability.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600">{ability.cost}</span>
                  <button
                    onClick={() => handlePurchaseAbility(key, ability, "instant")}
                    disabled={!canAddInstant}
                    className={`px-3 py-1 rounded transition-colors ${
                      canAddInstant 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{ability.description}</p>
              {ability.category && (
                <p className="text-xs text-gray-500 mb-3">Category: {ability.category}</p>
              )}
              <div className="mt-3">
                <label htmlFor={`custom-name-${key}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Name (optional):
                </label>
                <input
                  type="text"
                  id={`custom-name-${key}`}
                  placeholder={`e.g., "Blink Strike" (default: ${ability.name})`}
                  value={customNames[key] || ''}
                  onChange={(e) => handleCustomNameChange(key, e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={!canAddInstant}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPassiveAbilities = () => {
    const passiveEntries = Object.entries(PASSIVE_ABILITIES);

    return (
      <div className="space-y-4">
        {renderRulesSection('passiveAbilities', passiveCount, ABILITY_RULES.shared.maxPurchases, !canAddPassive)}
        <div className="grid gap-3">
          {passiveEntries.map(([key, ability]) => (
            <div key={key} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{ability.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">{ability.cost}</span>
                  <button
                    onClick={() => handlePurchaseAbility(key, ability, "passive")}
                    disabled={!canAddPassive}
                    className={`px-3 py-1 rounded transition-colors ${
                      canAddPassive 
                        ? "bg-green-600 text-white hover:bg-green-700" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{ability.description}</p>
              {ability.category && (
                <p className="text-xs text-gray-500 mb-3">Category: {ability.category}</p>
              )}
              <div className="mt-3">
                <label htmlFor={`custom-name-${key}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Name (optional):
                </label>
                <input
                  type="text"
                  id={`custom-name-${key}`}
                  placeholder={`e.g., "Iron Will" (default: ${ability.name})`}
                  value={customNames[key] || ''}
                  onChange={(e) => handleCustomNameChange(key, e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  disabled={!canAddPassive}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-6 text-black">
      <h1 className="text-lg font-semibold">Add an Ability Facet</h1>
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        This section is for purchasing Instant Abilities and Passive Abilities.
      </div>
      
      {/* Category Selection */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setSelectedCategory("instant")}
          className={`px-4 py-2 font-medium transition-colors ${
            selectedCategory === "instant"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Instant Abilities ({instantCount}/{ABILITY_RULES.shared.maxPurchases})
        </button>
        <button
          onClick={() => setSelectedCategory("passive")}
          className={`px-4 py-2 font-medium transition-colors ${
            selectedCategory === "passive"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Passive Abilities ({passiveCount}/{ABILITY_RULES.shared.maxPurchases})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        {selectedCategory === "instant" && renderInstantAbilities()}
        {selectedCategory === "passive" && renderPassiveAbilities()}
      </div>
    </div>
  );
}
