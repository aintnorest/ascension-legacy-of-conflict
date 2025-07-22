import React, { useState, useEffect } from "react";
import { loadSavedCharacters, loadCharacterByKey, deleteCharacter } from "./savedCharacterHelpers";

const classNames = {
  container: `p-6 bg-white rounded-lg`,
  header: `text-2xl font-bold mb-6`,
  noCharacters: `text-gray-500 text-center py-8`,
  characterList: `space-y-3`,
  characterItem: `border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50`,
  characterInfo: `flex-1`,
  characterName: `font-bold text-lg`,
  characterCost: `text-gray-600 text-sm`,
  buttonContainer: `flex gap-2`,
  loadButton: `bg-sky-500 hover:bg-sky-700 text-white px-4 py-2 rounded transition cursor-pointer`,
  deleteButton: `bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition cursor-pointer`,
  backButton: `bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded transition cursor-pointer mb-4`,
};

export default function SavedCharactersView({ onLoadCharacter }) {
  const [savedCharacters, setSavedCharacters] = useState([]);

  /**
   * Load all saved characters from localStorage on component mount
   */
  useEffect(() => {
    refreshSavedCharacters();
  }, []);

  /**
   * Refreshes the saved characters list
   */
  function refreshSavedCharacters() {
    const characters = loadSavedCharacters();
    setSavedCharacters(characters);
  }

  /**
   * Handles loading a selected character
   * @param {Object} characterData - The character data to load
   * @param {string} saveKey - The localStorage key for this character
   */
  function handleLoadCharacter(characterData, saveKey) {
    const result = loadCharacterByKey(saveKey);

    if (result.success) {
      onLoadCharacter(result.character);
      alert(result.message);
    }
    else {
      alert(result.error);
    }
  }

  /**
   * Handles deleting a saved character
   * @param {string} saveKey - The localStorage key to delete
   * @param {string} characterName - Name of character for confirmation
   */
  function handleDeleteCharacter(saveKey, characterName) {
    const confirmed = confirm(`Are you sure you want to delete "${characterName}"? This action cannot be undone.`);

    if (confirmed) {
      const result = deleteCharacter(saveKey, characterName);

      if (result.success) {
        // Reload the characters list
        refreshSavedCharacters();
        alert(result.message);
      }
      else {
        alert(result.error);
      }
    }
  }

  return (
    <div className={classNames.container}>
      <h2 className={classNames.header}>Saved Characters</h2>

      {savedCharacters.length === 0
        ? (
            <div className={classNames.noCharacters}>
              No saved characters found. Create and save a character first.
            </div>
          )
        : (
            <div className={classNames.characterList}>
              {savedCharacters.map(characterData => (
                <div key={characterData.key} className={classNames.characterItem}>
                  <div className={classNames.characterInfo}>
                    <div className={classNames.characterName}>{characterData.name}</div>
                    <div className={classNames.characterCost}>
                      Cost:
                      {` `}
                      {characterData.totalCost}
                      {` `}
                      points
                    </div>
                  </div>
                  <div className={classNames.buttonContainer}>
                    <button
                      className={classNames.loadButton}
                      onClick={() => handleLoadCharacter(characterData, characterData.key)}
                    >
                      Load
                    </button>
                    <button
                      className={classNames.deleteButton}
                      onClick={() => handleDeleteCharacter(characterData.key, characterData.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
    </div>
  );
}
