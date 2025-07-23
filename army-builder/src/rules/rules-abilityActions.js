import { ACTION_SYMBOLS } from './symbols.js';

export const ACTION_ABILITIES = {
  throwTarget: {
    name: `Throw Target`,
    descriptions: [
      { symbol: `(${ACTION_SYMBOLS.ACTION}):`, description: `Throw terrain piece or model` },
      { symbol: `(${ACTION_SYMBOLS.ACTION}2):`, description: `Throw terrain piece or model as though this character was 1 size larger.` },
    ],
    cost: 14,
    category: `control`,
    canTakeMultiple: false,
  },
  throwTerrain: {
    name: `Throw Terrain`,
    descriptions: [
      { symbol: `(${ACTION_SYMBOLS.ACTION}):`, description: `Throw terrain piece` },
      { symbol: `(${ACTION_SYMBOLS.ACTION}2):`, description: `Throw terrain piece as though this character was 1 size larger.` },
    ],
    cost: 10,
    category: `control`,
    canTakeMultiple: false,
  },
  displaceSelfLOS: {
    name: `Displace Self`,
    descriptions: [
      { symbol: `(${ACTION_SYMBOLS.ACTION}):`, description: `Place this character anywhere within 6" and line of sight` },
      { symbol: `(${ACTION_SYMBOLS.ACTION}2):`, description: `Place this character anywhere within 6"` },
    ],
    cost: 9,
    category: `movement`,
    canTakeMultiple: false,
  },
  shiftSelf: {
    name: `Shift Self`,
    descriptions: [
      { symbol: `(${ACTION_SYMBOLS.ACTION}):`, description: `Move this model 1"; does not count as movement` },
      { symbol: `(${ACTION_SYMBOLS.ACTION}2):`, description: `Move this model 3"; does not count as movement"` },
    ],
    cost: 6,
    category: `movement`,
    canTakeMultiple: false,
  },
  removeTemporaryEffect: {
    name: `Remove Temporary Effect`,
    descriptions: [
      { symbol: `(${ACTION_SYMBOLS.ACTION}):`, description: `Remove one temporary effect on a character within 4"` },
    ],
    cost: 8,
    category: `utility`,
    canTakeMultiple: false,
  },
  compelMovement: {
    name: `Compel Movement`,
    descriptions: [
      { symbol: `(${ACTION_SYMBOLS.ACTION}):`, description: `Target can only move toward this model on its next activation"` },
    ],
    cost: 7,
    category: `control`,
    canTakeMultiple: false,
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
