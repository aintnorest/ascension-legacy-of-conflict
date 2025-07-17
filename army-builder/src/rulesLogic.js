export const BASE_STATS_TABLE = [
  { value: 1, min: 25, max: 39, strides: 3, wounds: 1, influence: '0"', attackSkill: 0, defense: 2, sizeCost: 0 },
  { value: 2, min: 40, max: 59, strides: 2, wounds: 1, influence: '1"', attackSkill: 0, defense: 2, sizeCost: 1 },
  { value: 3, min: 60, max: 89, strides: 2, wounds: 1, influence: '3"', attackSkill: 0, defense: 2, sizeCost: 2 },
  { value: 4, min: 90, max: 129, strides: 1, wounds: 2, influence: '4"', attackSkill: 0, defense: 2, sizeCost: 4 },
  { value: 5, min: 130, max: 170, strides: 1, wounds: 2, influence: '5"', attackSkill: 0, defense: 2, sizeCost: 5 },
];

export const STAT_COSTS_AND_MAX = {
  wounds: {
    icon: "❤️",
    name: "Wounds",
    baseValue: "wounds", // property name in sizeRows
    maxUpgrades: 5,
    costType: "progressive",
    costs: [1, 2, 3, 4, 5], // incremental costs
    description: "Each additional Wound beyond the model's Base Wounds costs progressively more."
  },
  defense: {
    icon: "🛡️",
    name: "Defense",
    baseValue: "defense", // property name in sizeRows
    maxUpgrades: 3,
    costType: "progressive",
    costs: [4, 6, 8], // incremental costs
    description: "Each additional point of Defense beyond the base 2 costs progressively more."
  },
  attackSkill: {
    icon: "⚔️",
    name: "Attack Skill",
    baseValue: "attackSkill", // property name in sizeRows
    maxUpgrades: 6,
    costType: "progressive",
    costs: [3, 5, 7, 9, 11, 13], // incremental costs
    description: "Each additional point of Attack Skill beyond the base 0 costs progressively more."
  },
  strides: {
    icon: "👟",
    name: "Strides",
    baseValue: "strides", // property name in sizeRows
    maxUpgrades: 3,
    costType: "size-based",
    costs: {
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 5
    },
    description: "Each additional Stride beyond the model's Base Strides has a fixed cost based on the model's Size Value."
  }
};

export const ATTACK_TEMPLATES = {
  singleTarget: {
    icon: "①",
    name: "Single Target",
    description: "Attacks one model within range.",
    baseCosts: {
      primary: 10,
      secondary: 5
    },
    rangeUpgrades: [
      { range: 0, cost: 0, label: '0" (Base Contact)' },
      { range: 1, cost: 1, label: '1"' },
      { range: 2, cost: 2, label: '2"' },
      { range: 3, cost: 3, label: '3"' },
      { range: 4, cost: 5, label: '4"' },
      { range: 5, cost: 7, label: '5"' },
      { range: 6, cost: 9, label: '6"' },
      { range: 7, cost: 11, label: '7"' },
      { range: 8, cost: 13, label: '8"' },
      { range: 9, cost: 14, label: '9"' },
      { range: 10, cost: 17, label: '10"' },
      { range: 11, cost: 20, label: '11"' },
      { range: 12, cost: 23, label: '12"' }
    ]
  },
  area: {
    icon: "⭕",
    name: "Area",
    description: "Affects all models whose bases are touched by or partially within a circular template centered at the target point.",
    baseCosts: {
      primary: 17,
      secondary: 10
    },
    diameterUpgrades: [
      { diameter: 0, cost: 0, label: '0" (Center Point/Self)', restriction: "Only legal if range is 0" },
      { diameter: 1, cost: 2, label: '1" Diameter' },
      { diameter: 2, cost: 5, label: '2" Diameter' },
      { diameter: 3, cost: 10, label: '3" Diameter' },
      { diameter: 4, cost: 20, label: '4" Diameter' }
    ],
    rangeUpgrades: [
      { range: 0, cost: 1, label: '0"' },
      { range: 1, cost: 2, label: '1"' },
      { range: 2, cost: 4, label: '2"' },
      { range: 3, cost: 6, label: '3"' },
      { range: 4, cost: 9, label: '4"' },
      { range: 5, cost: 12, label: '5"' },
      { range: 6, cost: 16, label: '6"' },
      { range: 7, cost: 20, label: '7"' },
      { range: 8, cost: 25, label: '8"' }
    ]
  },
  breakthrough: {
    icon: "📏",
    name: "Breakthrough",
    description: "Affects models whose bases are touched by or intersect with a 1\" wide line drawn from the attacker's front arc.",
    baseCosts: {
      primary: 16,
      secondary: 9
    },
    lengthUpgrades: [
      { length: 1, cost: 1, label: '1"' },
      { length: 2, cost: 2, label: '2"' },
      { length: 3, cost: 4, label: '3"' },
      { length: 4, cost: 6, label: '4"' },
      { length: 5, cost: 9, label: '5"' },
      { length: 6, cost: 12, label: '6"' },
      { length: 7, cost: 16, label: '7"' },
      { length: 8, cost: 20, label: '8"' }
    ]
  },
  ricochet: {
    icon: "🔗",
    name: "Ricochet",
    description: "Chain attack that hits multiple targets in sequence, following line of sight rules between each target.",
    baseCosts: {
      primary: 14,
      secondary: 7
    },
    targetUpgrades: [
      { targets: 1, cost: 0, label: '1 Target (initial only)' },
      { targets: 2, cost: 2, label: '2 Targets' },
      { targets: 3, cost: 6, label: '3 Targets' }
    ],
    rangeBetweenUpgrades: [
      { range: 0, cost: 0, label: '0" (base to base only)' },
      { range: 1, cost: 1, label: '1"' },
      { range: 2, cost: 2, label: '2"' },
      { range: 3, cost: 4, label: '3"' },
      { range: 4, cost: 6, label: '4"' }
    ],
    initialRangeUpgrades: [
      { range: 0, cost: 1, label: '0" (base to base)' },
      { range: 1, cost: 2, label: '1"' },
      { range: 2, cost: 3, label: '2"' },
      { range: 3, cost: 5, label: '3"' },
      { range: 4, cost: 7, label: '4"' },
      { range: 5, cost: 9, label: '5"' },
      { range: 6, cost: 12, label: '6"' },
      { range: 7, cost: 15, label: '7"' },
      { range: 8, cost: 18, label: '8"' }
    ]
  }
};

export const ATTACK_EFFECTS = {
  movement: {
    category: "Movement Effects",
    effects: {
      displaceAttacker: {
        name: "Displace Attacker",
        description: "Move attacker within 1\" of target",
        costs: {
          "🃏✔️": 6, "🃏✖️": 7, "🃏✔️✖️": 8,
          "♣️✔️": 4, "♣️✖️": 5, "♣️✔️✖️": 6,
          "♣️♦️✔️": 2, "♣️♦️✖️": 3, "♣️♦️✔️✖️": 4,
          "♣️♣️✔️": 1, "♣️♣️✖️": 2, "♣️♣️✔️✖️": 3
        }
      },
      displaceDefender: {
        name: "Displace Defender",
        description: "Move target within 1\" of original position",
        costs: {
          "🃏✔️": 5, "🃏✖️": 6, "🃏✔️✖️": 7,
          "♣️✔️": 3, "♣️✖️": 4, "♣️✔️✖️": 5,
          "♣️♦️✔️": 1, "♣️♦️✖️": 2, "♣️♦️✔️✖️": 3,
          "♣️♣️✔️": 0, "♣️♣️✖️": 1, "♣️♣️✔️✖️": 2
        }
      },
      knockback: {
        name: "Knockback",
        description: "Push target 1\" directly away",
        costs: {
          "🃏✔️": 4, "🃏✖️": 5, "🃏✔️✖️": 6,
          "♣️✔️": 2, "♣️✖️": 3, "♣️✔️✖️": 4,
          "♣️♦️✔️": 1, "♣️♦️✖️": 2, "♣️♦️✔️✖️": 3,
          "♣️♣️✔️": 0, "♣️♣️✖️": 1, "♣️♣️✔️✖️": 2
        }
      },
      throw: {
        name: "Throw",
        description: "Throw target if 2 sizes smaller",
        costs: {
          "🃏✔️": 8, "🃏✖️": 9, "🃏✔️✖️": 10,
          "♣️✔️": 5, "♣️✖️": 6, "♣️✔️✖️": 7,
          "♣️♦️✔️": 3, "♣️♦️✖️": 4, "♣️♦️✔️✖️": 5,
          "♣️♣️✔️": 2, "♣️♣️✖️": 3, "♣️♣️✔️✖️": 4
        }
      },
      throwTerrain: {
        name: "Throw Terrain",
        description: "Throw terrain if 2 sizes smaller",
        costs: {
          "🃏✔️": 6, "🃏✖️": 7, "🃏✔️✖️": 8,
          "♣️✔️": 4, "♣️✖️": 5, "♣️✔️✖️": 6,
          "♣️♦️✔️": 2, "♣️♦️✖️": 3, "♣️♦️✔️✖️": 4,
          "♣️♣️✔️": 1, "♣️♣️✖️": 2, "♣️♣️✔️✖️": 3
        }
      }
    }
  },
  temporary: {
    category: "Temporary Effects",
    effects: {
      hinder: {
        name: "Hinder",
        description: "Add 1 Hinder Token to the Defender",
        costs: {
          "🃏✔️": 5, "🃏✖️": 6, "🃏✔️✖️": 7,
          "♣️✔️": 2, "♣️✖️": 3, "♣️✔️✖️": 4,
          "♣️♦️✔️": 1, "♣️♦️✖️": 2, "♣️♦️✔️✖️": 3,
          "♣️♣️✔️": 0, "♣️♣️✖️": 1, "♣️♣️✔️✖️": 2
        }
      },
      slow: {
        name: "Slow",
        description: "Add 1 Slow Token to the Defender",
        costs: {
          "🃏✔️": 5, "🃏✖️": 6, "🃏✔️✖️": 7,
          "♣️✔️": 2, "♣️✖️": 3, "♣️✔️✖️": 4,
          "♣️♦️✔️": 1, "♣️♦️✖️": 2, "♣️♦️✔️✖️": 3,
          "♣️♣️✔️": 0, "♣️♣️✖️": 1, "♣️♣️✔️✖️": 2
        }
      },
      weaken: {
        name: "Weaken",
        description: "Add 1 Weaken Token to the Defender",
        costs: {
          "🃏✔️": 5, "🃏✖️": 6, "🃏✔️✖️": 7,
          "♣️✔️": 2, "♣️✖️": 3, "♣️✔️✖️": 4,
          "♣️♦️✔️": 1, "♣️♦️✖️": 2, "♣️♦️✔️✖️": 3,
          "♣️♣️✔️": 0, "♣️♣️✖️": 1, "♣️♣️✔️✖️": 2
        }
      }
    }
  },
  other: {
    category: "Other Effects",
    effects: {
      damageOverTime: {
        name: "Damage Over Time",
        description: "Add 1 Damage Over Time Token to the Defender",
        costs: {
          "🃏✔️": 5, "🃏✖️": 6, "🃏✔️✖️": 7,
          "♣️✔️": 3, "♣️✖️": 4, "♣️✔️✖️": 5,
          "♣️♦️✔️": 2, "♣️♦️✖️": 3, "♣️♦️✔️✖️": 4,
          "♣️♣️✔️": 1, "♣️♣️✖️": 2, "♣️♣️✔️✖️": 3
        }
      },
      nullStrike: {
        name: "Null Strike",
        description: "No damage dealt",
        costs: {
          "🃏✔️": -6, "🃏✖️": -5, "🃏✔️✖️": -4
        },
        restriction: "Cannot be chosen unless at least one Always effect is present"
      },
      exhaust: {
        name: "Exhaust",
        description: "Add 1 Exhaust Token to 1 of the Defender's Actions",
        costs: {
          "🃏✔️": 22, "🃏✖️": 25, "🃏✔️✖️": 28,
          "♣️✔️": 11, "♣️✖️": 14, "♣️✔️✖️": 17,
          "♣️♦️✔️": 8, "♣️♦️✖️": 11, "♣️♦️✔️✖️": 14
        }
      }
    }
  }
};

export const SUIT_DEPENDENCIES = {
  always: {
    symbol: "🃏",
    name: "Always",
    description: "Effect activates regardless of the suits flipped"
  },
  matchSuit: {
    symbol: "♣️",
    name: "Match Suit",
    description: "Effect activates only if at least one of the specified suit is flipped"
  },
  twoSuit: {
    symbol: "♣️♦️",
    name: "Two Different Suits",
    description: "Effect activates only if one of each specified suit is flipped"
  },
  bothSuits: {
    symbol: "♣️♣️",
    name: "Both Same Suit",
    description: "Effect activates only if both cards flipped are the same specified suit"
  }
};

export const EFFECT_TIMING = {
  onHit: {
    symbol: "✔️",
    name: "On Hit",
    description: "Effect applies only if the attack is successful"
  },
  onMiss: {
    symbol: "✖️",
    name: "On Miss",
    description: "Effect applies only if the attack fails"
  },
  onHitOrMiss: {
    symbol: "✔️✖️",
    name: "On Hit or Miss",
    description: "Effect applies regardless of whether the attack hits or misses"
  }
};

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

export const INSTANT_ABILITIES = {
  displaceTarget: {
    name: "Displace Target (Reach, Size -2)",
    description: "Throw target 2 sizes smaller within reach",
    cost: 12,
    category: "displacement",
    targeting: "reach",
    sizeRequirement: "-2"
  },
  displaceTerrain: {
    name: "Displace Terrain (Reach, Size -2)",
    description: "Throw terrain 2 sizes smaller within reach",
    cost: 10,
    category: "displacement",
    targeting: "reach",
    sizeRequirement: "-2"
  },
  displaceSelfLOS: {
    name: "Displace Self (LOS, 6\")",
    description: "Place this model anywhere within 6\" and line of sight",
    cost: 6,
    category: "displacement",
    targeting: "self",
    range: "6\"",
    requiresLOS: true
  },
  shiftSelf: {
    name: "Shift Self (1\")",
    description: "Move this model 1\"; does not count as movement",
    cost: 4,
    category: "movement",
    targeting: "self",
    range: "1\""
  },
  removeTemporaryEffect: {
    name: "Remove Temporary Effect (4\")",
    description: "Remove one temporary effect on a model within 4\"",
    cost: 8,
    category: "utility",
    targeting: "model",
    range: "4\""
  },
  compelMovement: {
    name: "Compel Movement (LOS, 4\")",
    description: "Target can only move toward this model on its next activation",
    cost: 8,
    category: "control",
    targeting: "model",
    range: "4\"",
    requiresLOS: true
  },
  displaceSelfNoLOS: {
    name: "Displace Self (No LOS, 4\")",
    description: "Place this model anywhere within 4\", ignoring line of sight",
    cost: 8,
    category: "displacement",
    targeting: "self",
    range: "4\"",
    requiresLOS: false
  }
};

export const PASSIVE_ABILITIES = {
  grantDefenseBonus: {
    name: "Grant Defense Bonus (Aura, 2\")",
    description: "Friendly models within 2\" gain +1 Defense",
    cost: 10,
    category: "aura",
    range: "2\"",
    effect: "+1 Defense to allies"
  },
  reduceWoundTaken1: {
    name: "Reduce Wound Taken (Min 1)",
    description: "Reduces all incoming damage by 1 (min 1)",
    cost: 15,
    category: "defense",
    effect: "Damage reduction -1 (min 1)"
  },
  reduceWoundTaken2: {
    name: "Reduce Wound Taken (Min 2)",
    description: "Reduces all incoming damage by 2 (min 2)",
    cost: 16,
    category: "defense",
    effect: "Damage reduction -2 (min 2)"
  },
  displacementImmunity: {
    name: "Displacement Immunity (Size ≤ Self)",
    description: "Immune to Push and Throw from models of equal/lesser Size",
    cost: 12,
    category: "immunity",
    effect: "Immunity to displacement from equal/smaller models"
  },
  regenerateSelf: {
    name: "Regenerate Self (End of Activation)",
    description: "At end of activation, heal 1 Wound if no active DOT",
    cost: 12,
    category: "healing",
    timing: "end of activation",
    condition: "no active DOT"
  },
  increaseDisplacementSize2: {
    name: "Increase Displacement Size (+2)",
    description: "+2 size vs push/throw",
    cost: 10,
    category: "defense",
    effect: "+2 effective size vs displacement"
  },
  attackBonusVsLarge: {
    name: "Attack Bonus vs Large (Size 3+)",
    description: "+1 to Attack Skill when targeting models with Size 3+",
    cost: 5,
    category: "offense",
    effect: "+1 Attack Skill vs Size 3+ targets"
  },
  ignoreClimbPenalty: {
    name: "Ignore Climb Penalty",
    description: "Ignores extra Stride cost for Climbing (R-5.2.4)",
    cost: 6,
    category: "movement",
    effect: "No climbing movement penalty"
  },
  ignoreMovementPenalties: {
    name: "Ignore Movement Penalties",
    description: "Ignores all movement penalties except the Slow condition",
    cost: 9,
    category: "movement",
    effect: "Ignore movement penalties (except Slow)"
  },
  defenseBonusVsRanged: {
    name: "Defense Bonus vs Ranged",
    description: "+2 defense vs ranged attacks",
    cost: 6,
    category: "defense",
    effect: "+2 Defense vs ranged attacks"
  },
  attackPenaltyAura: {
    name: "Attack Penalty Aura (2\"+Influence)",
    description: "-1 to attacks within 2\"+influence",
    cost: 5,
    category: "aura",
    range: "2\"+influence",
    effect: "-1 to enemy attacks in range"
  },
  attackBonusIfStationary: {
    name: "Attack Bonus If Stationary",
    description: "+2 to attack if no move action this turn",
    cost: 8,
    category: "offense",
    condition: "no movement this turn",
    effect: "+2 Attack Skill when stationary"
  },
  attackPenaltyVsDistant: {
    name: "Attack Penalty vs Distant (6\"+)",
    description: "-2 to attacks from beyond 6\"",
    cost: 8,
    category: "defense",
    effect: "-2 to incoming attacks from 6\"+ range"
  },
  increaseVsDisplacementSize2: {
    name: "Increase vs Displacement Size (+2)",
    description: "+2 size vs push/throw",
    cost: 8,
    category: "defense",
    effect: "+2 effective size vs displacement"
  },
  alwaysPartialCover: {
    name: "Always Partial Cover",
    description: "Always benefits from Partial Cover (R-6.2.2)",
    cost: 7,
    category: "defense",
    effect: "Permanent Partial Cover benefit"
  },
  increaseForDisplacementSize1: {
    name: "Increase For Displacement Size (+1)",
    description: "+1 size for push/throw",
    cost: 6,
    category: "offense",
    effect: "+1 effective size when displacing others"
  },
  increaseCoverBonus: {
    name: "Increase Cover Bonus",
    description: "Increase cover +1",
    cost: 6,
    category: "defense",
    effect: "+1 to all cover bonuses"
  },
  increaseVsDisplacementSize1: {
    name: "Increase vs Displacement Size (+1)",
    description: "+1 size vs push/throw",
    cost: 4,
    category: "defense",
    effect: "+1 effective size vs displacement"
  },
  ignoreObscuredStealth: {
    name: "Ignore Obscured/Stealth",
    description: "Ignores Obscured terrain (R-6.2.2) and enemy Stealth Field",
    cost: 9,
    category: "utility",
    effect: "Ignore Obscured terrain and Stealth"
  }
};

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

export const REACTION_ACTIONS = {
  negateDisplacement: {
    name: "Negate Displacement (Self)",
    description: "Cannot be pushed or thrown this attack",
    trigger: "When targeted by push or throw",
    cost: 12,
    category: "defensive",
    targeting: "self",
    effect: "Immunity to displacement for one attack"
  },
  reduceDisplacement: {
    name: "Reduce Displacement (Self, 2\")",
    description: "Reduce push/knockback distance by 2\"",
    trigger: "When pushed or knocked back",
    cost: 8,
    category: "defensive",
    targeting: "self",
    effect: "Reduce displacement distance by 2\""
  },
  displaceSelfReaction: {
    name: "Displace Self (Reaction, 1\")",
    description: "Move 1\" before attack resolves",
    trigger: "When targeted by an attack",
    cost: 8,
    category: "evasive",
    targeting: "self",
    range: "1\"",
    effect: "Move 1\" before attack resolution"
  },
  increaseDefense: {
    name: "Increase Defense",
    description: "Draw 3 cards for defense and discard 1 of player's choice",
    trigger: "When targeted by an attack",
    cost: 8,
    category: "defensive",
    targeting: "self",
    effect: "Draw 3 defense cards, discard 1"
  }
};

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