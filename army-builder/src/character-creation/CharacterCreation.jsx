'use client';

import React, { useState } from "react";
import Menu from "./Menu";
import View from "./View";
import { createNewCharacter } from "@/rules/utils-characterStructure";
import { calculateTotalCost, calculateActionTokens } from "@/rules/utils-characterCosts";

const classNames = {
  container: `w-full grid grid-cols-1 md:grid-cols-2 gap-6`,
};

export default function CharacterCreation() {
  const [currentView, setCurrentView] = useState(`character-card`);
  const [character, setCharacter] = useState(createNewCharacter);
  /**
   * Updates character state.
   * @param {Object} updates - Character updates to apply
   */
  function updateCharacter(updates) {
    const updatedCharacter = { ...character, ...updates };
    setCharacter(updatedCharacter);
    setCurrentView(`character-card`);
  }

  /**
   * Loads a complete character (replaces current character entirely).
   * @param {Object} newCharacter - Complete character object to load
   */
  function loadCharacter(newCharacter) {
    setCharacter(newCharacter);
    setCurrentView(`character-card`);
  }

  /**
   * Updates character size and resets character to defaults with base stats from size.
   * @param {Object} sizeData - Size data with value and mm
   * @param {Object} baseStats - Base stats for the selected size
   */
  function updateCharacterSize(sizeData, baseStats) {
    const newCharacter = createNewCharacter();
    newCharacter.name = character.name; // Preserve name
    newCharacter.size = sizeData;

    // Set base stats from the size selection
    if (baseStats) {
      newCharacter.stats = {
        attackSkill: baseStats.attackSkill,
        defense: baseStats.defense,
        influence: baseStats.influence,
        strides: baseStats.strides,
        wounds: baseStats.wounds,
      };
    }

    setCharacter(newCharacter);
    setCurrentView(`character-card`);
  }

  /**
   * Gets dynamic calculated values for the character.
   * @returns {Object} Calculated values
   */
  function getCalculatedValues() {
    return {
      totalCost: calculateTotalCost(character),
      actionTokens: calculateActionTokens(character),
    };
  }

  /**
   * Handles deleting a facet
   * @param {string} facetType - Type of facet to delete
   * @param {string} facetId - ID of facet to delete
   * @param {Object} facetData - Facet data object
   */
  function handleFacetDelete(facetType, facetId, facetData) {
    const updatedCharacter = { ...character };

    // Remove the facet from the appropriate array based on its type
    switch (facetData.subType) {
      case `attack`:
        updatedCharacter.attackActions = updatedCharacter.attackActions.filter(
          action => action.id !== facetId,
        );
        break;
      case `ability`:
        updatedCharacter.abilityActions = updatedCharacter.abilityActions.filter(
          action => action.id !== facetId,
        );
        break;
      case `response`:
        updatedCharacter.responseActions = updatedCharacter.responseActions.filter(
          action => action.id !== facetId,
        );
        break;
      case `trait`:
        updatedCharacter.traits = updatedCharacter.traits.filter(
          trait => trait.id !== facetId,
        );
        break;
      default:
        if (facetData.type === `trait`) {
          updatedCharacter.traits = updatedCharacter.traits.filter(trait => trait.id !== facetId);
        }
        break;
    }

    setCharacter(updatedCharacter);
    setCurrentView(`character-card`);
  }

  return (
    <section className={classNames.container}>
      <Menu
        onViewChange={setCurrentView}
        character={character}
        onUpdateCharacter={updateCharacter}
        calculatedValues={getCalculatedValues()}
      />
      <View
        currentView={currentView}
        character={character}
        onUpdateCharacter={updateCharacter}
        onUpdateCharacterSize={updateCharacterSize}
        onLoadCharacter={loadCharacter}
        onFacetDelete={handleFacetDelete}
      />
    </section>
  );
}
