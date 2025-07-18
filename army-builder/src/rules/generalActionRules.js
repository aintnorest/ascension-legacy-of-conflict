export const GENERAL_ACTION_RULES = {
  exhaustionOption: {
    name: "Exhaustion Option",
    description: "When purchasing any action, the player MAY choose to make it more taxing",
    effects: {
      exhaustTokens: 2, // instead of 1
      costReduction: 3, // cannot reduce below 1 point
      mustChooseAtPurchase: true
    }
  },
  uniqueActionRequirement: {
    name: "Unique Action Requirement",
    description: "Unless an action explicitly states otherwise, a model CANNOT purchase the same exact action more than once"
  },
  attackSkillCap: {
    name: "Attack Skill Cap for Area/Breakthrough/Ricochet",
    description: "Attack Skill is considered maximum 4 for Area, Breakthrough, and Ricochet attacks, even if actual Attack Skill is higher",
    affectedTemplates: ["area", "breakthrough", "ricochet"],
    maxAttackSkill: 4
  }
};
