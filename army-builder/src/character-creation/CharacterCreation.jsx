'use client'

import React, { useState } from "react";
import { Tooltip } from 'react-tooltip'
import CharacterCard from "@/character-card/Card";
import SizeView from "./SizeView";
import StatsView from "./StatsView";
import AttackActionFacetView from "./AttackActionFacetView";
import AbilityFacetView from "./AbilityView";
import ReactionView from "./ReactionView";

const classNames = {};

export default function CharacterCreation({

}) {
  const [character, setCharacter] = useState({
    attackSkill: undefined,
    defense: undefined,
    facets: [],
    influence: undefined,
    mm: undefined,
    name: "",
    size: undefined,
    sizeCost: 0,
    statsCost: 0,
    strides: undefined,
    wounds: undefined,
  });
  const [view, setView] = useState("character-card");
  const [editingAttackIndex, setEditingAttackIndex] = useState(null);
console.log("Character Creation Component Rendered", character);
  function updateBaseStats(data) {
    setCharacter({
      ...character,
      attackSkill: data.attackSkill,
      defense: data.defense,
      wounds: data.wounds,
      strides: data.strides,
      statsCost: data.cost,
    })
    setView("character-card");
  }

  function addAttackAction(attackData) {
    setCharacter({
      ...character,
      facets: [...character.facets, attackData]
    });
    setView("character-card");
  }

  function addAbility(abilityData) {
    setCharacter({
      ...character,
      facets: [...character.facets, abilityData]
    });
    setView("character-card");
  }

  function addReaction(reactionData) {
    setCharacter({
      ...character,
      facets: [...character.facets, reactionData]
    });
    setView("character-card");
  }

  function updateAttackAction(index, attackData) {
    const newFacets = [...character.facets];
    newFacets[index] = attackData;
    setCharacter({
      ...character,
      facets: newFacets
    });
    setEditingAttackIndex(null);
    setView("character-card");
  }

  function handleFacetEdit(index, facet) {
    if (facet.subType === "attack") {
      setEditingAttackIndex(index);
      setView("edit-attack-action-facet");
    }
  }

  function handleFacetDelete(index, facet) {
    const newFacets = character.facets.filter((_, i) => i !== index);
    setCharacter({
      ...character,
      facets: newFacets
    });
  }

  function calculateTotalCost() {
    const sizeCost = typeof character.sizeCost === 'number' && !isNaN(character.sizeCost) ? character.sizeCost : 0;
    const statsCost = typeof character.statsCost === 'number' && !isNaN(character.statsCost) ? character.statsCost : 0;
    const facetsCost = character.facets.reduce((total, facet) => {
      return total + (typeof facet.cost === 'number' && !isNaN(facet.cost) ? facet.cost : 0);
    }, 0);
    return sizeCost + statsCost + facetsCost;
  }

  function changeSize(data, mm) {
    setCharacter({
      ...character,
      attackSkill: data.attackSkill,
      defense: data.defense,
      influence: data.influence,
      mm: mm,
      size: data.value,
      sizeCost: data.sizeCost,
      statsCost: 0,
      strides: data.strides,
      wounds: data.wounds,
    });
    setView("character-card");
  }

  return (
    <section id="characterCreation" className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <section id="editSection" className="relative">
        <h1>Edit</h1>
        <div className="bg-white rounded-lg p-4 flex flex-col gap-4 text-black">
          <label htmlFor="name">Character Name:</label>
          <input
            type="text"
            placeholder=""
            id="name"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50"
            value={character.name}
            onChange={e => {
              setCharacter({ ...character, name: e.target.value });
              if (view !== "character-card") setView("character-card");
            }}
          />
          <button className="bg-sky-500 hover:bg-sky-700 cursor-pointer px-4 py-2 rounded transition" onClick={() => setView("character-size")}>Choose Size</button>
          <button disabled={!(character.size)} className="bg-sky-500 hover:bg-sky-700 cursor-pointer px-4 py-2 rounded transition disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed" onClick={() => setView("character-stats")}>Edit Base Stats</button>
          <button disabled={!(character.size)} className="bg-sky-500 hover:bg-sky-700 cursor-pointer px-4 py-2 rounded transition disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed" onClick={() => setView("add-attack-action-facet")}>Add Attack Action</button>
          <button disabled={!(character.size)} className="bg-sky-500 hover:bg-sky-700 cursor-pointer px-4 py-2 rounded transition disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed" onClick={() => setView("add-ability-facet")}>Add Ability</button>
          <button disabled={!(character.size)} className="bg-sky-500 hover:bg-sky-700 cursor-pointer px-4 py-2 rounded transition disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed" onClick={() => setView("add-reaction-facet")}>Add Reaction</button>
          <button className="bg-sky-500 hover:bg-sky-700 cursor-pointer px-4 py-2 rounded transition" onClick={() => setView("character-card")}>View Character Card</button>
        </div>
        <span
          data-tooltip-id="characterCost"
          data-tooltip-content="Character Cost"
          data-tooltip-place="top"
          className="absolute flex items-center justify-center border-2 border-sky-500 bg-sky-100 text-sky-800 font-bold shadow rounded-full w-8 h-8 text-[10px] top-2 right-2"
        >
          {calculateTotalCost()}
        </span>
        <Tooltip id="characterCost" />
      </section>
      <section id="viewSection">
        <h1>View</h1>
        {view === "character-card" && <CharacterCard {...character} edit={true} onFacetEdit={handleFacetEdit} onFacetDelete={handleFacetDelete} />}
        {view === "character-size" && <SizeView key={character.mm ?? 'mm'} mm={character.mm} size={character.size} setSize={changeSize} />}
        {view === "character-stats" && <StatsView {...character} updateBaseStats={updateBaseStats} />}
        {view === "add-attack-action-facet" && <AttackActionFacetView attackSkill={character.attackSkill} existingFacets={character.facets} onAddAttack={addAttackAction} />}
        {view === "add-ability-facet" && <AbilityFacetView existingFacets={character.facets} onAddAbility={addAbility} />}
        {view === "add-reaction-facet" && <ReactionView existingFacets={character.facets} onAddReaction={addReaction} />}
        {view === "edit-attack-action-facet" && editingAttackIndex !== null && (
          <AttackActionFacetView
            attackSkill={character.attackSkill}
            existingAttack={character.facets[editingAttackIndex]}
            existingFacets={character.facets}
            onUpdateAttack={(attackData) => updateAttackAction(editingAttackIndex, attackData)}
          />
        )}
      </section>
    </section>
  )
}