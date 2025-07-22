import { ATTACK_TEMPLATES } from "@/rules/rules-attackActions";
import { ATTACK_EFFECTS } from "@/rules/rules-attackEffects";

/**
 * Calculate the total cost of an attack action based on template and upgrades
 */
export const calculateAttackCost = (
  selectedTemplate,
  templateConfig,
  selectedEffects,
) => {
  if (!selectedTemplate) return 0;

  const template = ATTACK_TEMPLATES[selectedTemplate];
  let totalCost = template.baseCosts;

  // Add template-specific upgrade costs
  switch (selectedTemplate) {
    case `singleTarget`: {
      const rangeUpgrade = template.rangeUpgrades.find(r => r.range === templateConfig.range);
      totalCost += rangeUpgrade?.cost || 0;
      break;
    }

    case `area`: {
      const areaRangeUpgrade = template.rangeUpgrades.find(r => r.range === templateConfig.range);
      const diameterUpgrade = template.diameterUpgrades.find(
        d => d.diameter === templateConfig.diameter,
      );
      totalCost += (areaRangeUpgrade?.cost || 0) + (diameterUpgrade?.cost || 0);
      break;
    }

    case `breakthrough`: {
      const lengthUpgrade = template.lengthUpgrades.find(l => l.length === templateConfig.length);
      totalCost += lengthUpgrade?.cost || 0;
      break;
    }

    case `ricochet`: {
      const targetUpgrade = template.targetUpgrades.find(t => t.targets === templateConfig.targets);
      const initRangeUpgrade = template.initialRangeUpgrades.find(
        r => r.range === templateConfig.initialRange,
      );
      const betweenUpgrade = template.rangeBetweenUpgrades.find(
        r => r.range === templateConfig.betweenRange,
      );
      totalCost += (targetUpgrade?.cost || 0) + (initRangeUpgrade?.cost || 0)
        + (betweenUpgrade?.cost || 0);
      break;
    }
  }

  // Add effects costs
  selectedEffects.forEach((effect) => {
    totalCost += effect.cost || 0;
  });

  return totalCost;
};

/**
 * Get attack modifiers based on selected template and configuration
 */
export const getAttackModifiers = (selectedTemplate, templateConfig) => {
  switch (selectedTemplate) {
    case `singleTarget`:
      return { type: `singleTarget`, r: templateConfig.range };
    case `area`:
      return { type: `area`, r: templateConfig.range, a: templateConfig.diameter };
    case `breakthrough`:
      return { type: `breakthrough`, l: templateConfig.length };
    case `ricochet`:
      return {
        type: `ricochet`,
        t: templateConfig.targets,
        initR: templateConfig.initialRange,
        btwn: templateConfig.betweenRange,
      };
    default:
      return {};
  }
};

/**
 * Get effective attack skill based on template and token usage
 */
export const getEffectiveAttackSkill = (attackSkill, selectedTemplate, tokenUsage) => {
  const template = ATTACK_TEMPLATES[selectedTemplate];
  if (!template) return attackSkill;

  const baseSkill = tokenUsage === `double` ? attackSkill : Math.max(0, attackSkill - 2);
  return baseSkill + template.attackSkillModifier;
};

/**
 * Create an effect object for adding to selected effects
 */
export const createEffectObject = (categoryKey, effectKey, triggerKey, cost) => {
  const category = ATTACK_EFFECTS[categoryKey];
  const effect = category.effects[effectKey];

  return {
    type: effect.name,
    description: effect.description,
    trigger: triggerKey,
    cost: cost,
    categoryKey,
    effectKey,
  };
};

/**
 * Get initial template configuration for a given template type
 */
export const getInitialTemplateConfig = (templateType) => {
  switch (templateType) {
    case `singleTarget`:
      return { range: 0 };
    case `area`:
      return { range: 0, diameter: 0 };
    case `breakthrough`:
      return { length: 1 };
    case `ricochet`:
      return { targets: 1, initialRange: 0, betweenRange: 0 };
    default:
      return {};
  }
};
