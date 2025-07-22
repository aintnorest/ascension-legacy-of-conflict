/**
 * Character data structure utilities for the army builder.
 * Handles character creation, validation, and data management.
 */

import { v4 as uuidv4 } from 'uuid';
import { CURRENT_CHARACTER_VERSION } from './rules-characterCreationVersion';

/**
 * Creates a new character with default values and current rule version.
 * @returns {Object} New character object
 */
export function createNewCharacter() {
  return {
    // Metadata
    version: CURRENT_CHARACTER_VERSION,
    id: uuidv4(),

    // Basic Info
    name: ``,

    // Size Information
    size: {
      value: undefined, // Game size (1, 2, 3, 4, etc.)
      mm: undefined, // Base size in millimeters
    },

    // Character Stats
    stats: {
      attackSkill: undefined,
      defense: undefined,
      wounds: undefined,
      strides: undefined,
      influence: undefined,
    },

    // Actions (separate arrays for easier manipulation)
    attackActions: [], // Each item dynamically calculated cost
    abilityActions: [], // Each item dynamically calculated cost
    responseActions: [], // Each item dynamically calculated cost
    traits: [], // Each item dynamically calculated cost
  };
}

/**
 * Creates a standard action structure with type-specific metadata.
 * @param {string} type - Action type: 'attack', 'ability', 'response', 'trait'
 * @param {string} name - Action name
 * @param {Object} meta - Type-specific properties
 * @returns {Object} Standardized action object
 */
export function createAction(type, name = ``, meta = {}) {
  return {
    id: uuidv4(),
    name,
    type,
    meta: {
      ...getDefaultMetaForType(type),
      ...meta,
    },
  };
}

/**
 * Returns default metadata structure for each action type.
 * @param {string} type - Action type
 * @returns {Object} Default metadata object
 */
function getDefaultMetaForType(type) {
  switch (type) {
    case `attack`:
      return {
        template: undefined, // singleTarget, area, breakthrough, ricochet
        // Template-specific properties (based on template selection):
        // singleTarget: { range }
        // area: { range, diameter }
        // breakthrough: { length }
        // ricochet: { targets, initialRange, betweenRange }
      };
    case `ability`:
      return {
        // Ability-specific properties (no duration or targets needed)
      };
    case `response`:
      return {
        trigger: undefined, // Single trigger event
      };
    case `trait`:
      return {
        // Trait-specific properties (passive is always true, so not needed)
      };
    default:
      return {};
  }
}

/**
 * Validates if a character object has the required structure.
 * @param {Object} character - Character object to validate
 * @returns {boolean} True if valid character structure
 */
export function isValidCharacterStructure(character) {
  if (!character || typeof character !== `object`) return false;

  const requiredFields = [
    `version`, `id`, `name`, `size`, `stats`,
    `attackActions`, `abilityActions`, `responseActions`, `traits`,
  ];

  return requiredFields.every(field => Object.prototype.hasOwnProperty.call(character, field));
}

/**
 * Checks if character version matches current rules version.
 * @param {Object} character - Character object
 * @returns {boolean} True if character is current version
 */
export function isCurrentVersion(character) {
  return character.version === CURRENT_CHARACTER_VERSION;
}
