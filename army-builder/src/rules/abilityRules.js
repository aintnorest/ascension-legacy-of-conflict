export const ABILITY_RULES = {
  shared: {
    playerNaming: "Players are encouraged to assign their own thematic names for narrative purposes",
    namingConvention: "[Effect] [Target/Range/LOS] [Distance/Area] [Special Condition]",
    maxPurchases: 3,
    maxPurchasesRule: "A model MAY purchase up to 3 of each ability type",
    costScaling: "Ability costs reflect their power level and game impact",
    narrativeUse: "Abilities should enhance the model's role in the narrative"
  },
  instantAbilities: {
    description: "Special abilities that can be activated during gameplay",
    activationTiming: "Instant abilities can be used during the model's activation",
    onePerTurn: "A model MAY only use one instant ability per turn",
    rules: [
      "shared.playerNaming",
      "shared.namingConvention", 
      "shared.maxPurchases",
      "shared.costScaling"
    ]
  },
  passiveAbilities: {
    description: "Special rules, passive benefits, or always-on effects that define a model's inherent capabilities or unique traits",
    alwaysActive: "Passive abilities are always in effect and do not require activation",
    stackingLimits: "Multiple passive abilities of the same type do not stack unless explicitly stated",
    rules: [
      "shared.playerNaming",
      "shared.maxPurchases",
      "shared.narrativeUse"
    ]
  }
};
