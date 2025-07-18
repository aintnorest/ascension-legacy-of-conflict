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
