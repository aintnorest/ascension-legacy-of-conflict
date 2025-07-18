export const ATTACK_ACTION_RULES = {
  minimumRequirement: {
    description: "Each model MUST have at least 1 Attack Action",
    enforcement: "mandatory"
  },
  attackSkillCap: {
    description: "Attack Skill is considered maximum 4 for Area, Breakthrough, and Ricochet attacks, even if actual Attack Skill is higher",
    maxAttackSkill: 4,
    affectedTemplates: ["area", "breakthrough", "ricochet"]
  },
  primaryAttack: {
    description: "Uses the model's full Attack Skill for its attack value",
    attackSkillModifier: 0,
    limit: 1 // Only one primary attack per model
  },
  secondaryAttack: {
    description: "Uses the model's Attack Skill - 2 (minimum 0) for its attack value",
    attackSkillModifier: -2,
    minimum: 0
  },
  exhaustionOption: {
    description: "Action inflicts 2 Exhaust Tokens instead of 1, reduces cost by 2 points",
    exhaustTokens: 2,
    costReduction: 2,
    minimumCost: 1
  }
};
