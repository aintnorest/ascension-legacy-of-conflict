import { ATTACK_TEMPLATE_SYMBOLS, ACTION_TOKEN_SYMBOLS } from './symbols.js';
import { generateAttackEffectsTables, calculateMaxAttackEffects } from './rules-attackEffects.js';

export const ATTACK_TEMPLATES = {
  singleTarget: {
    icon: ATTACK_TEMPLATE_SYMBOLS.SINGLE_TARGET,
    name: `Single Target`,
    description: `Attacks one model within range. Uses the character's full Attack Skill with no penalty.`,
    baseCosts: 8,
    attackSkillModifier: 0,
    rangeUpgrades: [
      { range: 0, cost: 0, label: `0" (Base Contact)` },
      { range: 1, cost: 1, label: `1"` },
      { range: 2, cost: 2, label: `2"` },
      { range: 3, cost: 3, label: `3"` },
      { range: 4, cost: 5, label: `4"` },
      { range: 5, cost: 7, label: `5"` },
      { range: 6, cost: 9, label: `6"` },
      { range: 7, cost: 11, label: `7"` },
      { range: 8, cost: 13, label: `8"` },
      { range: 9, cost: 14, label: `9"` },
      { range: 10, cost: 17, label: `10"` },
      { range: 11, cost: 20, label: `11"` },
      { range: 12, cost: 23, label: `12"` },
    ],
  },
  area: {
    icon: ATTACK_TEMPLATE_SYMBOLS.AREA,
    name: `Area`,
    description: `Affects all models whose bases are touched by or partially within a circular template centered at the target point. Uses Attack Skill -1 due to the complexity of area targeting.`,
    baseCosts: 14,
    attackSkillModifier: -1,
    diameterUpgrades: [
      { diameter: 0, cost: 0, label: `0" (Touching Base)`, restriction: `Only legal if range is 0` },
      { diameter: 1, cost: 2, label: `1" Diameter` },
      { diameter: 2, cost: 5, label: `2" Diameter` },
      { diameter: 3, cost: 10, label: `3" Diameter` },
      { diameter: 4, cost: 20, label: `4" Diameter` },
    ],
    rangeUpgrades: [
      { range: 0, cost: 1, label: `0"` },
      { range: 1, cost: 2, label: `1"` },
      { range: 2, cost: 4, label: `2"` },
      { range: 3, cost: 6, label: `3"` },
      { range: 4, cost: 9, label: `4"` },
      { range: 5, cost: 12, label: `5"` },
      { range: 6, cost: 16, label: `6"` },
      { range: 7, cost: 20, label: `7"` },
      { range: 8, cost: 25, label: `8"` },
    ],
  },
  breakthrough: {
    icon: ATTACK_TEMPLATE_SYMBOLS.BREAKTHROUGH,
    name: `Breakthrough`,
    description: `Affects models whose bases are touched by or intersect with a 1" wide line drawn from the attacker's front arc. Uses Attack Skill -1 due to the precision required for line targeting.`,
    baseCosts: 12,
    attackSkillModifier: -1,
    lengthUpgrades: [
      { length: 1, cost: 1, label: `1"` },
      { length: 2, cost: 2, label: `2"` },
      { length: 3, cost: 4, label: `3"` },
      { length: 4, cost: 6, label: `4"` },
      { length: 5, cost: 9, label: `5"` },
      { length: 6, cost: 12, label: `6"` },
      { length: 7, cost: 16, label: `7"` },
      { length: 8, cost: 20, label: `8"` },
    ],
  },
  ricochet: {
    icon: ATTACK_TEMPLATE_SYMBOLS.RICOCHET,
    name: `Ricochet`,
    description: `Chain attack that hits multiple targets in sequence, following line of sight rules between each target. Uses Attack Skill -1 due to the complexity of chaining targets.`,
    baseCosts: 10,
    attackSkillModifier: -1,
    targetUpgrades: [
      { targets: 1, cost: 0, label: `1 Target (initial only)` },
      { targets: 2, cost: 2, label: `2 Targets` },
      { targets: 3, cost: 6, label: `3 Targets` },
    ],
    rangeBetweenUpgrades: [
      { range: 0, cost: 0, label: `0" (base to base only)` },
      { range: 1, cost: 1, label: `1"` },
      { range: 2, cost: 2, label: `2"` },
      { range: 3, cost: 4, label: `3"` },
      { range: 4, cost: 6, label: `4"` },
    ],
    initialRangeUpgrades: [
      { range: 0, cost: 1, label: `0" (base to base)` },
      { range: 1, cost: 2, label: `1"` },
      { range: 2, cost: 3, label: `2"` },
      { range: 3, cost: 5, label: `3"` },
      { range: 4, cost: 7, label: `4"` },
      { range: 5, cost: 9, label: `5"` },
      { range: 6, cost: 12, label: `6"` },
      { range: 7, cost: 15, label: `7"` },
      { range: 8, cost: 18, label: `8"` },
    ],
  },
};

const singleAttackTemplate = {
  name: ATTACK_TEMPLATES.singleTarget.name,
  description: `${ATTACK_TEMPLATES.singleTarget.description} Attack Skill Modifier: ${ATTACK_TEMPLATES.singleTarget.attackSkillModifier >= 0 ? `+` : ``}${ATTACK_TEMPLATES.singleTarget.attackSkillModifier}. Costs: ${ATTACK_TEMPLATES.singleTarget.baseCosts} points.

Range Cost Upgrades:

${ATTACK_TEMPLATES.singleTarget.rangeUpgrades.map(u => `- ${u.label} (${u.cost} points)`).join(`\n`)}
`,
};

const areaAttackTemplate = {
  name: ATTACK_TEMPLATES.area.name,
  description: `${ATTACK_TEMPLATES.area.description} Attack Skill Modifier: ${ATTACK_TEMPLATES.area.attackSkillModifier >= 0 ? `+` : ``}${ATTACK_TEMPLATES.area.attackSkillModifier}. Costs: ${ATTACK_TEMPLATES.area.baseCosts} points.

Area Diameter Cost Upgrades:

${ATTACK_TEMPLATES.area.diameterUpgrades.map(u => `- ${u.label} (${u.cost} points)`).join(`\n`)}

Range Cost Upgrades:

${ATTACK_TEMPLATES.area.rangeUpgrades.map(u => `- ${u.label} (${u.cost} points)`).join(`\n`)}
`,
};

const breakthroughAttackTemplate = {
  name: ATTACK_TEMPLATES.breakthrough.name,
  description: `${ATTACK_TEMPLATES.breakthrough.description} Attack Skill Modifier: ${ATTACK_TEMPLATES.breakthrough.attackSkillModifier >= 0 ? `+` : ``}${ATTACK_TEMPLATES.breakthrough.attackSkillModifier}. Costs: ${ATTACK_TEMPLATES.breakthrough.baseCosts} points.

Line Length Cost Upgrades:

${ATTACK_TEMPLATES.breakthrough.lengthUpgrades.map(u => `- ${u.label} (${u.cost} points)`).join(`\n`)}
`,
};
const ricochetAttackTemplate = {
  name: ATTACK_TEMPLATES.ricochet.name,
  description: `${ATTACK_TEMPLATES.ricochet.description} Attack Skill Modifier: ${ATTACK_TEMPLATES.ricochet.attackSkillModifier >= 0 ? `+` : ``}${ATTACK_TEMPLATES.ricochet.attackSkillModifier}. Costs: ${ATTACK_TEMPLATES.ricochet.baseCosts} points.

Target Count Cost Upgrades:

${ATTACK_TEMPLATES.ricochet.targetUpgrades.map(u => `- ${u.label} (${u.cost} points)`).join(`\n`)}

Range Between Cost Upgrades:

${ATTACK_TEMPLATES.ricochet.rangeBetweenUpgrades.map(u => `- ${u.label} (${u.cost} points)`).join(`\n`)}

Initial Range Cost Upgrades:

${ATTACK_TEMPLATES.ricochet.initialRangeUpgrades.map(u => `- ${u.label} (${u.cost} points)`).join(`\n`)}
`,
};

const attackTemplateRules = {
  name: `Attack Template Rules`,
  description: `The first step in creating an Attack Action is to choose one of the available attack templates (Single Target, Area, Breakthrough, Ricochet). This section details rules for choosing an Attack Templates. Attack Templates define the area of effect, range, and other characteristics of an attack.`,
  rules: [
    singleAttackTemplate,
    areaAttackTemplate,
    breakthroughAttackTemplate,
    ricochetAttackTemplate,
  ],
};

const attackEffectLimitRules = {
  name: `Attack Effect Limits`,
  description: `Attack Actions can include effects that trigger under specific conditions. However, the number of effects an attack can have is limited by the character's Attack Skill.

Effect Limit Rule:
- Attacks can have 1 effect per 2 Attack Skill points (minimum 1 effect if Attack Skill ≥ 0)
- This limit is based on the character's base Attack Skill, unmodified by template type or action token usage

Examples:
${[0, 1, 2, 3, 4, 5, 6, 7].map(skill =>
  `- Attack Skill ${skill}: Maximum ${calculateMaxAttackEffects(skill)} effect${calculateMaxAttackEffects(skill) !== 1 ? `s` : ``}`,
).join(`\n`)}

The calculation is: Maximum Effects = floor((Attack Skill + 2) / 2)

This ensures that more skilled attackers can create more complex attacks while preventing overwhelming combinations at low skill levels.`,
};

export const attackActionRules = {
  name: `Attack Action Rules`,
  description: `This section details rules for creating Attack Actions. Attack's use the character's Attack Skill modified by the chosen attack template.

Attack Skill Modifiers:
Each attack template applies an Attack Skill modifier:

- Single Target: ${ATTACK_TEMPLATES.singleTarget.attackSkillModifier >= 0 ? `+` : ``}${ATTACK_TEMPLATES.singleTarget.attackSkillModifier} (no penalty)
- Area: ${ATTACK_TEMPLATES.area.attackSkillModifier >= 0 ? `+` : ``}${ATTACK_TEMPLATES.area.attackSkillModifier}
- Breakthrough: ${ATTACK_TEMPLATES.breakthrough.attackSkillModifier >= 0 ? `+` : ``}${ATTACK_TEMPLATES.breakthrough.attackSkillModifier}  
- Ricochet: ${ATTACK_TEMPLATES.ricochet.attackSkillModifier >= 0 ? `+` : ``}${ATTACK_TEMPLATES.ricochet.attackSkillModifier}

Token Usage:

- ${ACTION_TOKEN_SYMBOLS.SINGLE_TOKEN}: Attack Skill - 2 + Template Modifier
- ${ACTION_TOKEN_SYMBOLS.DOUBLE_TOKEN}: Full Attack Skill + Template Modifier

Example: A character with Attack Skill 3 using an Area attack template:

- ${ACTION_TOKEN_SYMBOLS.SINGLE_TOKEN}: 3 - 2 - 1 = 0 Attack Skill
- ${ACTION_TOKEN_SYMBOLS.DOUBLE_TOKEN}: 3 - 1 = 2 Attack Skill
`,
  rules: [
    attackTemplateRules,
    attackEffectLimitRules,
    ...generateAttackEffectsTables(),
  ],
};
