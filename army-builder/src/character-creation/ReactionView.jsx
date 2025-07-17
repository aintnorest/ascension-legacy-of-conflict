import React, { useState } from "react";
import { REACTION_ACTIONS, REACTION_ACTION_RULES } from "@/rulesLogic";

export default function ReactionView({
  existingFacets = [],
  onAddReaction = null,
}) {
  const [customNames, setCustomNames] = useState({}); // Store custom names for each reaction
  const [exhaustionOptions, setExhaustionOptions] = useState({}); // Store exhaustion option for each reaction

  // Check how many reactions have been purchased
  const reactionCount = existingFacets.filter(facet => facet.type === "reaction").length;
  const maxReactions = 3; // Set limit of 3 reactions
  const canAddReaction = reactionCount < maxReactions;

  const handleCustomNameChange = (reactionKey, value) => {
    setCustomNames(prev => ({
      ...prev,
      [reactionKey]: value
    }));
  };

  const handleExhaustionOptionChange = (reactionKey, isChecked) => {
    setExhaustionOptions(prev => ({
      ...prev,
      [reactionKey]: isChecked
    }));
  };

  const calculateReactionCost = (baseCost, reactionKey) => {
    const hasExhaustion = exhaustionOptions[reactionKey];
    if (hasExhaustion) {
      return Math.max(1, baseCost - REACTION_ACTION_RULES.exhaustionOption.costReduction);
    }
    return baseCost;
  };

  const handlePurchaseReaction = (reactionKey, reaction) => {
    if (onAddReaction && canAddReaction) {
      const customName = customNames[reactionKey]?.trim();
      const hasExhaustion = exhaustionOptions[reactionKey] || false;
      const finalCost = calculateReactionCost(reaction.cost, reactionKey);
      
      onAddReaction({
        type: "reaction",
        subType: "reaction", // Add subType for consistency with attack actions
        name: customName || reaction.name, // Use custom name if provided, otherwise default
        ruleName: reaction.name, // Always keep the original rule name for reference
        description: reaction.description,
        trigger: reaction.trigger,
        cost: finalCost,
        exhaust: hasExhaustion, // Add exhaustion state
        category: reaction.category,
        targeting: reaction.targeting,
        effect: reaction.effect,
        isPrimary: reaction.cost >= 10, // Determine based on cost for facet ratio rules
        id: reactionKey,
        ...(reaction.range && { range: reaction.range })
      });
    }
  };

  const renderRulesSection = () => {
    const rules = REACTION_ACTION_RULES;
    
    return (
      <div className="mb-4">
        <h3 className="font-medium text-gray-900">Reaction Actions</h3>
        <p className="text-sm text-gray-600 mb-2">
          Defensive and evasive actions that trigger in response to specific events
        </p>
        
        {/* Rules Display */}
        <div className="text-xs text-gray-500 mb-3 space-y-1">
          <p><span className="font-medium">Purchase Limit:</span> A model MAY purchase up to 3 reaction actions</p>
          {Object.entries(rules).map(([ruleKey, rule]) => (
            <p key={ruleKey}>
              <span className="font-medium">
                {ruleKey.charAt(0).toUpperCase() + ruleKey.slice(1).replace(/([A-Z])/g, ' $1')}:
              </span> {rule.description}
            </p>
          ))}
        </div>

        {!canAddReaction && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              Maximum reactions reached ({reactionCount}/{maxReactions}). You cannot purchase more reactions.
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderReactionActions = () => {
    const reactionEntries = Object.entries(REACTION_ACTIONS);

    return (
      <div className="space-y-4">
        {renderRulesSection()}
        <div className="grid gap-3">
          {reactionEntries.map(([key, reaction]) => {
            const finalCost = calculateReactionCost(reaction.cost, key);
            const hasExhaustion = exhaustionOptions[key] || false;
            
            return (
              <div key={key} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{reaction.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-purple-600">
                      {finalCost}
                      {hasExhaustion && reaction.cost !== finalCost && (
                        <span className="text-sm text-gray-500 line-through ml-1">{reaction.cost}</span>
                      )}
                    </span>
                    <button
                      onClick={() => handlePurchaseReaction(key, reaction)}
                      disabled={!canAddReaction}
                      className={`px-3 py-1 rounded transition-colors ${
                        canAddReaction 
                          ? "bg-purple-600 text-white hover:bg-purple-700" 
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{reaction.description}</p>
                
                <div className="text-xs text-gray-500 mb-3 space-y-1">
                  <p><span className="font-medium">Trigger:</span> {reaction.trigger}</p>
                  <p><span className="font-medium">Category:</span> {reaction.category}</p>
                  <p><span className="font-medium">Effect:</span> {reaction.effect}</p>
                  {reaction.range && (
                    <p><span className="font-medium">Range:</span> {reaction.range}</p>
                  )}
                </div>

                {/* Exhaustion Option */}
                <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={hasExhaustion}
                      onChange={(e) => handleExhaustionOptionChange(key, e.target.checked)}
                      disabled={!canAddReaction}
                      className="mr-2"
                    />
                    <span className="font-medium">Exhaustion Option:</span>
                    <span className="ml-1">Inflicts 2 Exhaust Tokens instead of 1, reduces cost by {REACTION_ACTION_RULES.exhaustionOption.costReduction} points (min 1)</span>
                  </label>
                </div>

                <div className="mt-3">
                  <label htmlFor={`custom-name-${key}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Name (optional):
                  </label>
                  <input
                    type="text"
                    id={`custom-name-${key}`}
                    placeholder={`e.g., "Counter Strike" (default: ${reaction.name})`}
                    value={customNames[key] || ''}
                    onChange={(e) => handleCustomNameChange(key, e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                    disabled={!canAddReaction}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-6 text-black">
      <h1 className="text-lg font-semibold">Add Reaction Action ({reactionCount}/{maxReactions})</h1>
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        This section is for purchasing Reaction Actions that trigger in response to specific events.
      </div>
      
      {/* Content */}
      <div className="flex-1">
        {renderReactionActions()}
      </div>
    </div>
  );
}
