import { calculateTotalCost } from "@/rules/utils-characterCosts";

/**
 * Loads all saved characters from localStorage
 * @returns {Array} Array of character data objects with metadata
 */
export function loadSavedCharacters() {
  try {
    const characters = [];

    // Iterate through all localStorage keys to find character saves
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith(`character_`)) {
        const characterData = localStorage.getItem(key);

        if (characterData) {
          try {
            const character = JSON.parse(characterData);
            const totalCost = calculateTotalCost(character);

            characters.push({
              key,
              character,
              totalCost,
              name: character.name || `Unnamed Character`,
            });
          }
          catch (parseError) {
            console.warn(`Failed to parse character data for key: ${key}`, parseError);
          }
        }
      }
    }

    // Sort by name for consistent display
    characters.sort((a, b) => a.name.localeCompare(b.name));
    return characters;
  }
  catch (error) {
    console.error(`Error loading saved characters:`, error);
    return [];
  }
}

/**
 * Saves a character to localStorage with validation
 * @param {Object} character - Character object to save
 * @returns {Object} Result object with success/error information
 */
export function saveCharacter(character) {
  // Validate character before saving
  if (!character.name || character.name.trim() === ``) {
    return {
      success: false,
      error: `Please enter a character name before saving.`,
    };
  }

  if (!character.size?.value || !character.size?.mm) {
    return {
      success: false,
      error: `Please select a character size before saving.`,
    };
  }

  const hasActions = (character.attackActions?.length > 0)
    || (character.abilityActions?.length > 0)
    || (character.responseActions?.length > 0)
    || (character.traits?.length > 0);

  if (!hasActions) {
    return {
      success: false,
      error: `Please add at least one action (attack, ability, response, or trait) before saving.`,
    };
  }

  try {
    const characterData = JSON.stringify(character);
    const characterName = character.name.trim();
    const timestamp = new Date().toISOString();
    const saveKey = `character_${characterName}_${timestamp}`;

    localStorage.setItem(saveKey, characterData);
    localStorage.setItem(`lastSavedCharacter`, saveKey);

    return {
      success: true,
      message: `Character "${characterName}" saved successfully!`,
      saveKey,
    };
  }
  catch (error) {
    console.error(`Error saving character:`, error);
    return {
      success: false,
      error: `Failed to save character. Please try again.`,
    };
  }
}

/**
 * Loads the last saved character from localStorage
 * @returns {Object} Result object with character data or error information
 */
export function loadLastSavedCharacter() {
  try {
    const lastSavedKey = localStorage.getItem(`lastSavedCharacter`);

    if (!lastSavedKey) {
      return {
        success: false,
        error: `No saved character found.`,
      };
    }

    const savedCharacterData = localStorage.getItem(lastSavedKey);

    if (!savedCharacterData) {
      return {
        success: false,
        error: `Saved character data not found.`,
      };
    }

    const loadedCharacter = JSON.parse(savedCharacterData);

    return {
      success: true,
      character: loadedCharacter,
      message: `Character "${loadedCharacter.name || `Unnamed Character`}" loaded successfully!`,
    };
  }
  catch (error) {
    console.error(`Error loading character:`, error);
    return {
      success: false,
      error: `Failed to load character. The saved data may be corrupted.`,
    };
  }
}

/**
 * Loads a specific character by save key
 * @param {string} saveKey - The localStorage key for the character
 * @returns {Object} Result object with character data or error information
 */
export function loadCharacterByKey(saveKey) {
  try {
    // Set this as the last saved character for future quick loads
    localStorage.setItem(`lastSavedCharacter`, saveKey);

    const savedCharacterData = localStorage.getItem(saveKey);

    if (!savedCharacterData) {
      return {
        success: false,
        error: `Character data not found.`,
      };
    }

    const loadedCharacter = JSON.parse(savedCharacterData);

    return {
      success: true,
      character: loadedCharacter,
      message: `Character "${loadedCharacter.name || `Unnamed Character`}" loaded successfully!`,
    };
  }
  catch (error) {
    console.error(`Error loading character:`, error);
    return {
      success: false,
      error: `Failed to load character. The saved data may be corrupted.`,
    };
  }
}

/**
 * Deletes a saved character from localStorage
 * @param {string} saveKey - The localStorage key to delete
 * @param {string} characterName - Name of character for confirmation
 * @returns {Object} Result object with success/error information
 */
export function deleteCharacter(saveKey, characterName) {
  try {
    localStorage.removeItem(saveKey);

    // If this was the last saved character, clear that reference
    const lastSavedKey = localStorage.getItem(`lastSavedCharacter`);
    if (lastSavedKey === saveKey) {
      localStorage.removeItem(`lastSavedCharacter`);
    }

    return {
      success: true,
      message: `Character "${characterName}" deleted successfully.`,
    };
  }
  catch (error) {
    console.error(`Error deleting character:`, error);
    return {
      success: false,
      error: `Failed to delete character. Please try again.`,
    };
  }
}
