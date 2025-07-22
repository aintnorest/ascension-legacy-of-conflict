import React from "react";
import CharacterCard from "@/character-card/Card";
import SizeView from "./SizeView";
import StatsView from "./StatsView";
import AttackActionView from "./AttackActionView";
import AbilityActionView from "./AbilityActionView";
import ResponseActionView from "./ResponseActionView";
import TraitsView from "./TraitsView";
// import ReactionView from "./ReactionView";

const classNames = {
  panel: `rounded-lg text-black`,
  sectionHeader: `text-xl text-white font-bold mb-4`,
  placeholder: `text-gray-500 text-center p-8`,
};

export default function View({
  currentView,
  character,
  onUpdateCharacter,
  onUpdateCharacterSize,
  onFacetDelete,
}) {
  const renderView = () => {
    switch (currentView) {
      case `character-size`:
        return (
          <SizeView
            character={character}
            onUpdateCharacterSize={onUpdateCharacterSize}
          />
        );
      case `character-stats`:
        return (
          <StatsView
            character={character}
            onUpdateCharacter={onUpdateCharacter}
          />
        );
      case `add-attack-action`:
        return (
          <AttackActionView
            character={character}
            onAddAttackAction={(attackData) => {
              // Add the attack action to the character's attackActions array
              const updatedCharacter = {
                ...character,
                attackActions: [...(character.attackActions || []), attackData],
              };
              onUpdateCharacter(updatedCharacter);
            }}
          />
        );
      case `add-ability-action`:
        return (
          <AbilityActionView
            onAddAbilityAction={(abilityData) => {
              const updatedCharacter = {
                ...character,
                abilityActions: [...(character.abilityActions || []), abilityData],
              };
              onUpdateCharacter(updatedCharacter);
            }}
          />
        );
      case `add-response-action`:
        return (
          <ResponseActionView
            onAddResponseAction={(responseData) => {
              // Add the response action to the character's responseActions array
              const updatedCharacter = {
                ...character,
                responseActions: [...(character.responseActions || []), responseData],
              };
              onUpdateCharacter(updatedCharacter);
            }}
          />
        );
      case `add-trait`:
        return (
          <TraitsView
            onAddTrait={(traitData) => {
              // Add the trait to the character's traits array
              const updatedCharacter = {
                ...character,
                traits: [...(character.traits || []), traitData],
              };
              onUpdateCharacter(updatedCharacter);
            }}
          />
        );
      case `character-card`:
      default:
        return (
          <CharacterCard
            character={character}
            edit={true}
            onFacetDelete={onFacetDelete}
          />
        );
    }
  };

  return (
    <section className={classNames.panel}>
      <h1 className={classNames.sectionHeader}>View</h1>
      {renderView()}
    </section>
  );
}
