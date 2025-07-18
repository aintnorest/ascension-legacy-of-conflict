export const REACTION_ACTION_RULES = {
  usageLimit: {
    description: "Reaction may be used once per trigger event",
    enforcement: "mandatory",
    limit: 1
  },
  exhaustionOption: {
    description: "Reactions can use the exhaustion option like attack actions",
    reference: "GENERAL_ACTION_RULES.exhaustionOption",
    exhaustTokens: 2,
    costReduction: 3,
    minimumCost: 1
  },
  triggerRequirement: {
    description: "Each reaction requires a specific trigger event to activate",
    enforcement: "mandatory"
  },
  uniqueReactionRequirement: {
    description: "Unless explicitly stated otherwise, a model CANNOT purchase the same exact reaction more than once",
    enforcement: "mandatory"
  }
};
