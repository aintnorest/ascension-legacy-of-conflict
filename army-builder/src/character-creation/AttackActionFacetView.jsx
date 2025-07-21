import React, { useState } from "react";
import { ATTACK_TEMPLATES, ATTACK_EFFECTS, SUIT_DEPENDENCIES, EFFECT_TIMING, GENERAL_ACTION_RULES, ATTACK_ACTION_RULES } from "@/rulesLogic";
import { SUIT_SYMBOLS } from "@/rules/symbols";

export default function AttackActionFacetView({
  attackSkill,
  existingAttack = null,
  existingFacets = [],
  onAddAttack = null,
  onUpdateAttack = null,
}) {
  const isEditMode = !!existingAttack;
  
  // Check if there's already a primary attack action in existingFacets
  const hasPrimaryAttack = existingFacets.some((facet, index) => 
    facet.subType === "attack" && 
    facet.primary && 
    // Don't count the current attack being edited
    (!isEditMode || existingFacets.indexOf(existingAttack) !== index)
  );
  
  // If editing an existing attack that is primary, allow it to remain primary
  const canBePrimary = !hasPrimaryAttack || (isEditMode && existingAttack?.primary);
  
  // Initialize state from existing attack or defaults
  const [actionName, setActionName] = useState(existingAttack?.name || "");
  const [selectedTemplate, setSelectedTemplate] = useState(existingAttack?.attackModifiers?.type || "");
  const [isPrimary, setIsPrimary] = useState(existingAttack?.primary ?? (!hasPrimaryAttack));
  const [useExhaustion, setUseExhaustion] = useState(existingAttack?.exhaust ?? false);
  
  // Template-specific configurations
  const [singleTargetRange, setSingleTargetRange] = useState(existingAttack?.attackModifiers?.r || 0);
  const [areaRange, setAreaRange] = useState(existingAttack?.attackModifiers?.r || 0);
  const [areaDiameter, setAreaDiameter] = useState(existingAttack?.attackModifiers?.a || 0);
  const [breakthroughLength, setBreakthroughLength] = useState(existingAttack?.attackModifiers?.l || 1);
  const [ricochetTargets, setRicochetTargets] = useState(existingAttack?.attackModifiers?.t || 1);
  const [ricochetInitialRange, setRicochetInitialRange] = useState(existingAttack?.attackModifiers?.initR || 0);
  const [ricochetBetweenRange, setRicochetBetweenRange] = useState(existingAttack?.attackModifiers?.btwn || 0);
  
  // Effects state
  const [selectedEffects, setSelectedEffects] = useState(existingAttack?.attackEffects || []);

  // Calculate total cost
  const calculateTotalCost = () => {
    if (!selectedTemplate) return 0;
    
    const template = ATTACK_TEMPLATES[selectedTemplate];
    let totalCost = isPrimary ? template.baseCosts.primary : template.baseCosts.secondary;
    
    // Add template-specific upgrade costs
    switch (selectedTemplate) {
      case 'singleTarget':
        const rangeUpgrade = template.rangeUpgrades.find(r => r.range === singleTargetRange);
        totalCost += rangeUpgrade?.cost || 0;
        break;
        
      case 'area':
        const areaRangeUpgrade = template.rangeUpgrades.find(r => r.range === areaRange);
        const diameterUpgrade = template.diameterUpgrades.find(d => d.diameter === areaDiameter);
        totalCost += (areaRangeUpgrade?.cost || 0) + (diameterUpgrade?.cost || 0);
        break;
        
      case 'breakthrough':
        const lengthUpgrade = template.lengthUpgrades.find(l => l.length === breakthroughLength);
        totalCost += lengthUpgrade?.cost || 0;
        break;
        
      case 'ricochet':
        const targetUpgrade = template.targetUpgrades.find(t => t.targets === ricochetTargets);
        const initRangeUpgrade = template.initialRangeUpgrades.find(r => r.range === ricochetInitialRange);
        const betweenUpgrade = template.rangeBetweenUpgrades.find(r => r.range === ricochetBetweenRange);
        totalCost += (targetUpgrade?.cost || 0) + (initRangeUpgrade?.cost || 0) + (betweenUpgrade?.cost || 0);
        break;
    }
    
    // Add effects costs
    selectedEffects.forEach(effect => {
      totalCost += effect.cost || 0;
    });
    
    // Apply exhaustion reduction
    if (useExhaustion) {
      totalCost = Math.max(1, totalCost - GENERAL_ACTION_RULES.exhaustionOption.effects.costReduction);
    }
    
    return totalCost;
  };

  // Handle adding an effect
  const addEffect = (categoryKey, effectKey, triggerKey, cost) => {
    const category = ATTACK_EFFECTS[categoryKey];
    const effect = category.effects[effectKey];
    
    // Parse trigger key to get suit and timing
    const [suit, timing] = triggerKey.split(/(?=✔️|✖️)/);
    
    const newEffect = {
      type: effect.name,
      description: effect.description,
      trigger: triggerKey,
      cost: cost,
      categoryKey,
      effectKey,
      suit: suit || SUIT_SYMBOLS.JOKER,
      timing: timing || "✔️"
    };
    
    setSelectedEffects([...selectedEffects, newEffect]);
  };

  // Handle removing an effect
  const removeEffect = (index) => {
    setSelectedEffects(selectedEffects.filter((_, i) => i !== index));
  };

  // Handle saving the attack
  const handleSave = () => {
    if (!actionName || !selectedTemplate) return;
    
    const attackData = {
      type: "action",
      subType: "attack",
      name: actionName,
      exhaust: useExhaustion,
      primary: isPrimary,
      attackModifiers: getAttackModifiers(),
      attackEffects: selectedEffects,
      cost: calculateTotalCost()
    };
    
    if (isEditMode && onUpdateAttack) {
      onUpdateAttack(attackData);
    } else if (!isEditMode && onAddAttack) {
      onAddAttack(attackData);
    }
  };

  // Get attack modifiers based on selected template
  const getAttackModifiers = () => {
    switch (selectedTemplate) {
      case 'singleTarget':
        return { type: 'singleTarget', r: singleTargetRange };
      case 'area':
        return { type: 'area', r: areaRange, a: areaDiameter };
      case 'breakthrough':
        return { type: 'breakthrough', l: breakthroughLength };
      case 'ricochet':
        return { 
          type: 'ricochet', 
          t: ricochetTargets, 
          initR: ricochetInitialRange, 
          btwn: ricochetBetweenRange 
        };
      default:
        return {};
    }
  };

  // Apply attack skill cap for area/breakthrough/ricochet
  const getEffectiveAttackSkill = () => {
    if (['area', 'breakthrough', 'ricochet'].includes(selectedTemplate)) {
      const baseAttackSkill = isPrimary ? attackSkill : Math.max(0, attackSkill - 2);
      return Math.min(baseAttackSkill, GENERAL_ACTION_RULES.attackSkillCap.maxAttackSkill);
    }
    return isPrimary ? attackSkill : Math.max(0, attackSkill - 2);
  };

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-6 text-black">
      <h1 className="text-lg font-semibold">
        {isEditMode ? "Edit Attack Action" : "Add Attack Action"}
      </h1>
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        Configure an Attack Action for your character. {ATTACK_ACTION_RULES.minimumRequirement.description}.
        {ATTACK_ACTION_RULES.attackSkillCap.description}.
      </div>
      
      {/* Action Name */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Action Name:</label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50"
          value={actionName}
          onChange={e => setActionName(e.target.value)}
          placeholder="Enter attack name"
        />
      </div>

      {/* Primary/Secondary Selection */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPrimary}
            onChange={e => setIsPrimary(e.target.checked)}
            disabled={!canBePrimary && !isPrimary}
          />
          Primary Attack (Attack Skill: {getEffectiveAttackSkill()})
          {!canBePrimary && !isPrimary && (
            <span className="text-sm text-gray-500">(Primary attack already exists)</span>
          )}
        </label>
        <div className="text-sm text-gray-600">
          {isPrimary ? 
            ATTACK_ACTION_RULES.primaryAttack.description : 
            ATTACK_ACTION_RULES.secondaryAttack.description
          }
        </div>
      </div>

      {/* Exhaustion Option */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useExhaustion}
            onChange={e => setUseExhaustion(e.target.checked)}
          />
          Use Exhaustion Option ({ATTACK_ACTION_RULES.exhaustionOption.description})
        </label>
      </div>

      {/* Template Selection */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Attack Template:</label>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(ATTACK_TEMPLATES).map(([key, template]) => (
            <div
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={`p-3 border rounded cursor-pointer hover:bg-blue-50 ${
                selectedTemplate === key ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{template.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold">{template.name}</div>
                  <div className="text-sm text-gray-600">{template.description}</div>
                  <div className="text-sm font-medium">
                    Base Cost: {isPrimary ? template.baseCosts.primary : template.baseCosts.secondary} points
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template-specific options */}
      {selectedTemplate && (
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Template Configuration</h3>
          
          {selectedTemplate === 'singleTarget' && (
            <div className="flex flex-col gap-2">
              <label className="font-medium">Range:</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50"
                value={singleTargetRange}
                onChange={e => setSingleTargetRange(parseInt(e.target.value))}
              >
                {ATTACK_TEMPLATES.singleTarget.rangeUpgrades.map(upgrade => (
                  <option key={upgrade.range} value={upgrade.range}>
                    {upgrade.label} (+{upgrade.cost} points)
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedTemplate === 'area' && (
            <>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Range to Center:</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50"
                  value={areaRange}
                  onChange={e => setAreaRange(parseInt(e.target.value))}
                >
                  {ATTACK_TEMPLATES.area.rangeUpgrades.map(upgrade => (
                    <option key={upgrade.range} value={upgrade.range}>
                      {upgrade.label} (+{upgrade.cost} points)
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Area Diameter:</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50"
                  value={areaDiameter}
                  onChange={e => setAreaDiameter(parseInt(e.target.value))}
                >
                  {ATTACK_TEMPLATES.area.diameterUpgrades.map(upgrade => (
                    <option key={upgrade.diameter} value={upgrade.diameter}>
                      {upgrade.label} (+{upgrade.cost} points)
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {selectedTemplate === 'breakthrough' && (
            <div className="flex flex-col gap-2">
              <label className="font-medium">Line Length:</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50"
                value={breakthroughLength}
                onChange={e => setBreakthroughLength(parseInt(e.target.value))}
              >
                {ATTACK_TEMPLATES.breakthrough.lengthUpgrades.map(upgrade => (
                  <option key={upgrade.length} value={upgrade.length}>
                    {upgrade.label} (+{upgrade.cost} points)
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedTemplate === 'ricochet' && (
            <>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Number of Targets:</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50"
                  value={ricochetTargets}
                  onChange={e => setRicochetTargets(parseInt(e.target.value))}
                >
                  {ATTACK_TEMPLATES.ricochet.targetUpgrades.map(upgrade => (
                    <option key={upgrade.targets} value={upgrade.targets}>
                      {upgrade.label} (+{upgrade.cost} points)
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Initial Range:</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50"
                  value={ricochetInitialRange}
                  onChange={e => setRicochetInitialRange(parseInt(e.target.value))}
                >
                  {ATTACK_TEMPLATES.ricochet.initialRangeUpgrades.map(upgrade => (
                    <option key={upgrade.range} value={upgrade.range}>
                      {upgrade.label} (+{upgrade.cost} points)
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Range Between Targets:</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50"
                  value={ricochetBetweenRange}
                  onChange={e => setRicochetBetweenRange(parseInt(e.target.value))}
                >
                  {ATTACK_TEMPLATES.ricochet.rangeBetweenUpgrades.map(upgrade => (
                    <option key={upgrade.range} value={upgrade.range}>
                      {upgrade.label} (+{upgrade.cost} points)
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      )}

      {/* Effects Section */}
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold">Attack Effects</h3>
        
        {/* Selected Effects */}
        {selectedEffects.length > 0 && (
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Selected Effects:</h4>
            {selectedEffects.map((effect, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-green-50 border border-green-300 rounded">
                <span>
                  {effect.trigger}: {effect.description} (+{effect.cost} points)
                </span>
                <button
                  onClick={() => removeEffect(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Effects */}
        <div className="flex flex-col gap-4">
          {Object.entries(ATTACK_EFFECTS).map(([categoryKey, category]) => (
            <div key={categoryKey} className="flex flex-col gap-2">
              <h4 className="font-medium">{category.category}</h4>
              {Object.entries(category.effects).map(([effectKey, effect]) => (
                <div key={effectKey} className="border border-gray-300 rounded p-3">
                  <div className="font-medium">{effect.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{effect.description}</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    {Object.entries(effect.costs || {}).map(([triggerKey, cost]) => (
                      <button
                        key={triggerKey}
                        onClick={() => addEffect(categoryKey, effectKey, triggerKey, cost)}
                        className="p-1 bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded text-center"
                        disabled={cost < 0 && !selectedEffects.some(e => e.suit === SUIT_SYMBOLS.JOKER)}
                      >
                        {triggerKey}: {cost} pts
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Cost Summary and Actions */}
      <div className="flex flex-col gap-4 pt-4 border-t">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Cost:</span>
          <span>{calculateTotalCost()} points</span>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={!actionName || !selectedTemplate}
            className={`flex-1 py-3 px-4 rounded font-semibold ${
              actionName && selectedTemplate
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isEditMode ? "Update Attack" : "Add Attack"}
          </button>
          
          <button
            onClick={() => {
              setActionName(existingAttack?.name || "");
              setSelectedTemplate(existingAttack?.attackModifiers?.type || "");
              setIsPrimary(existingAttack?.primary ?? (!hasPrimaryAttack));
              setUseExhaustion(existingAttack?.exhaust ?? false);
              setSelectedEffects(existingAttack?.attackEffects || []);
              // Reset template-specific values
              setSingleTargetRange(existingAttack?.attackModifiers?.r || 0);
              setAreaRange(existingAttack?.attackModifiers?.r || 0);
              setAreaDiameter(existingAttack?.attackModifiers?.a || 0);
              setBreakthroughLength(existingAttack?.attackModifiers?.l || 1);
              setRicochetTargets(existingAttack?.attackModifiers?.t || 1);
              setRicochetInitialRange(existingAttack?.attackModifiers?.initR || 0);
              setRicochetBetweenRange(existingAttack?.attackModifiers?.btwn || 0);
            }}
            className="py-3 px-4 rounded font-semibold bg-gray-600 text-white hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
