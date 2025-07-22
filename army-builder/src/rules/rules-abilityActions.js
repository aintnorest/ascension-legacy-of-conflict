export const ACTION_ABILITIES = {
  displaceTarget: {
    name: `Displace Target (Reach, Size -2)`,
    description: `Throw target 2 sizes smaller that is in base contact.`,
    cost: 12,
    category: `control`,
    sizeRequirement: `-2`,
  },
  displaceTerrain: {
    name: `Displace Terrain (Reach, Size -2)`,
    description: `Throw terrain 2 sizes smaller that is in base contact.`,
    cost: 10,
    category: `control`,
    sizeRequirement: `-2`,
  },
  displaceSelfLOS: {
    name: `Displace Self (LOS, 6")`,
    description: `Place this model anywhere within 6" and line of sight`,
    cost: 6,
    category: `movement`,
    range: `6"`,
    requiresLOS: true,
  },
  shiftSelf: {
    name: `Shift Self (1")`,
    description: `Move this model 1"; does not count as movement`,
    cost: 4,
    category: `movement`,
    range: `1"`,
  },
  removeTemporaryEffect: {
    name: `Remove Temporary Effect (4")`,
    description: `Remove one temporary effect on a model within 4"`,
    cost: 8,
    category: `utility`,
    range: `4"`,
  },
  compelMovement: {
    name: `Compel Movement (LOS, 4")`,
    description: `Target can only move toward this model on its next activation`,
    cost: 8,
    category: `control`,
    range: `4"`,
    requiresLOS: true,
  },
  displaceSelfNoLOS: {
    name: `Displace Self (No LOS, 4")`,
    description: `Place this model anywhere within 4", ignoring line of sight`,
    cost: 8,
    category: `movement`,
    range: `4"`,
    requiresLOS: false,
  },
};

const abilityActionsTable = {
  type: `table`,
  title: `Ability Actions`,
  description: `Special abilities that can be activated during gameplay. A model MAY only use one ability action per turn.`,
  headers: [`Ability Action`, `Description`, `Cost`],
  computeRows: () => {
    const rows = [];

    // Group ability actions by category for better organization
    const categories = {};
    Object.entries(ACTION_ABILITIES).forEach(([_key, ability]) => {
      if (!categories[ability.category]) {
        categories[ability.category] = [];
      }
      categories[ability.category].push(ability);
    });

    Object.entries(categories).forEach(([categoryName, abilities]) => {
      // Add category header
      rows.push([`**${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}**`, ``, ``]);

      // Add ability actions in this category
      abilities.forEach((ability) => {
        rows.push([
          ability.name,
          ability.description,
          `${ability.cost} points`,
        ]);
      });

      // Add spacing between categories
      rows.push([``, ``, ``]);
    });

    // Remove last empty row
    if (rows.length > 0 && rows[rows.length - 1][0] === ``) {
      rows.pop();
    }

    return rows;
  },
};

export const abilityActionRules = {
  name: `Ability Action Rules`,
  description: `This section details rules for purchasing Ability Actions.`,
  rules: [
    abilityActionsTable,
  ],
};
