import React from "react";
import { Tooltip } from "react-tooltip";
import { saveCharacter } from "./savedCharacterHelpers";

const classNames = {
  panel: `rounded-lg text-black relative`,
  menuContainer: `p-4 flex flex-col gap-4 bg-white rounded-lg`,
  sectionHeader: `text-xl font-bold text-white mb-4`,
  nameSection: `flex flex-col gap-2 mb-4`,
  nameLabel: `font-medium`,
  nameInput: `border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50`,
  button: `bg-sky-500 hover:bg-sky-700 text-white cursor-pointer px-4 py-2 rounded transition`,
  buttonDisabled: `bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded`,
  buttonContainer: `flex flex-col gap-4`,
  costBadge: `absolute top-2 right-2 bg-sky-100 border-2 border-sky-500 text-sky-800 font-bold text-[10px] px-2 py-1 rounded-full`,
};

export default function Menu({
  character,
  onViewChange,
  onUpdateCharacter,
  calculatedValues,
}) {
  /**
   * Handles character name changes and switches to character card view.
   * @param {Event} e - Input change event
   */
  function handleNameChange(e) {
    onUpdateCharacter({ name: e.target.value });
    onViewChange(`character-card`);
  }

  /**
   * Saves the current character to local storage
   */
  function handleSaveCharacter() {
    const result = saveCharacter(character);

    if (result.success) {
      alert(result.message);
    }
    else {
      alert(result.error);
    }
  }

  // Check if size is selected
  const hasSizeSelected = character.size?.value !== undefined && character.size?.mm !== undefined;

  return (
    <section className={classNames.panel}>
      {/* Cost Badge */}
      {calculatedValues && (
        <div
          data-tooltip-id="characterCost"
          data-tooltip-content="Character Cost"
          data-tooltip-place="top"
          className={classNames.costBadge}
        >
          {calculatedValues.totalCost}
        </div>
      )}
      <Tooltip id="characterCost" />
      <h1 className={classNames.sectionHeader}>Character Builder</h1>
      <div className={classNames.menuContainer}>
        <div className={classNames.nameSection}>
          <label htmlFor="characterName" className={classNames.nameLabel}>
            Character Name:
          </label>
          <input
            id="characterName"
            type="text"
            className={classNames.nameInput}
            value={character.name || ``}
            onChange={handleNameChange}
            placeholder="Enter character name"
          />
        </div>

        <div className={classNames.buttonContainer}>
          <button
            className={classNames.button}
            onClick={() => onViewChange(`character-size`)}
          >
            Choose Size
          </button>
          <button
            className={hasSizeSelected ? classNames.button : classNames.buttonDisabled}
            onClick={() => hasSizeSelected && onViewChange(`character-stats`)}
            disabled={!hasSizeSelected}
          >
            Edit Base Stats
          </button>
          <button
            className={hasSizeSelected ? classNames.button : classNames.buttonDisabled}
            onClick={() => hasSizeSelected && onViewChange(`add-attack-action`)}
            disabled={!hasSizeSelected}
          >
            Add Attack Action
          </button>
          <button
            className={hasSizeSelected ? classNames.button : classNames.buttonDisabled}
            onClick={() => hasSizeSelected && onViewChange(`add-ability-action`)}
            disabled={!hasSizeSelected}
          >
            Add Ability Action
          </button>
          <button
            className={hasSizeSelected ? classNames.button : classNames.buttonDisabled}
            onClick={() => hasSizeSelected && onViewChange(`add-response-action`)}
            disabled={!hasSizeSelected}
          >
            Add Response Action
          </button>
          <button
            className={hasSizeSelected ? classNames.button : classNames.buttonDisabled}
            onClick={() => hasSizeSelected && onViewChange(`add-trait`)}
            disabled={!hasSizeSelected}
          >
            Add Trait
          </button>
          <button
            className={classNames.button}
            onClick={handleSaveCharacter}
          >
            Save Character
          </button>
          <button
            className={classNames.button}
            onClick={() => onViewChange(`saved-characters`)}
          >
            Manage Saved Characters
          </button>
          <button
            className={classNames.button}
            onClick={() => onViewChange(`character-card`)}
          >
            View Character Card
          </button>
        </div>
      </div>
    </section>
  );
}
