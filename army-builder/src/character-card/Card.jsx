import React from "react";
import Facet from './Facet';
import css from './card.module.css';
import { STATS_SYMBOLS, GAME_SYMBOLS } from '@/rules/symbols';

const classNames = {
  characterCard: "w-[4in] max-h-[6in] box-border border-2 border-[#222] rounded-lg p-[0.15in] bg-[#faf9f6] font-['Roboto_Condensed',Arial,Helvetica,sans-serif] text-[10px] text-black flex flex-col",
  characterCardRow: "flex items-stretch w-full grid grid-cols-[1fr_auto] mb-[0.05in]",
  coreInfo: "pr-[0.05in] relative flex flex-col justify-end w-full",
  nameRow: "text-[14px] truncate overflow-hidden whitespace-nowrap absolute top-[-8px] left-[-3px] w-full z-10 p-0 px-0",
  baseStats: "flex items-end h-full text-[16px] pb-1",
  coreUsage: "flex gap-[0.05in]",
  coreUsageSquares: "relative w-[0.75in] aspect-square border-2 border-[#222] rounded bg-white flex items-center justify-center text-[34px]",
};
/*
**Attack Modifiers:**

* **R:** Range (e.g., R:3" for 3-inch range)
* **A:** Area Diameter (e.g., A:2" for 2-inch diameter)
* **L:** Line Length (e.g., L:3" for 3-inch line length)
* **T:** Number of Targets (e.g., T:2 for 2 targets)
* **Btwn:** Range Between Targets (e.g., Btwn:2" for 2 inches between targets)
* **InitR:** Initial Range (for Ricochet, e.g., InitR:4")

{ACTION_SYMBOLS.ACTION} Actions or {ACTION_SYMBOLS.REACTION} ReActions
{ACTION_SYMBOLS.INSTANT} Instants
∞ Constants
*/
// const items = [
//   {
//     type: "action",
//     subType: "attack",
//     name: "Thunder Strike",
//     exhaust: false,
//     primary: true,
//     attackModifiers: {
//       type: "area",
//       r: 2,
//       a: 2,
//     },
//     attackEffects: [
//       {
//         type: "Damage Over Time",
//         description: "Add 1 Damage Over Time Token to the Defender",
//         trigger: "✔️|🃏",
//       },
//       {
//         type: "Knockback",
//         description: "Push target 1\" directly away",
//         trigger: "✔️|♠️",
//       },
//     ],
//   },
//   {
//     type: "action",
//     subType: "attack",
//     name: "Chain Lightning",
//     exhaust: false,
//     primary: false,
//     attackModifiers: {
//       type: "ricochet",
//       initR: 3,
//       t: 2,
//       btwn: 2,
//     },
//     attackEffects: [
//       {
//         type: "Weaken",
//         description: "Add 1 Weaken Token to the Defender",
//         trigger: "✔️✖️|🃏",
//       },
//     ],
//   },
//   {
//     type: "instant",
//     name: 'Teleport',
//     exhaust: true,
//     description: 'Place this model anywhere within 6" and line of sight',
//   },
//   {
//     type: "passive",
//     name: "Defense Aura",
//     description: "Friendly models within 2\" gain +1 Defense",
//     cost: 10,
//   },
//   {
//     type: "passive",
//     name: "Evasion",
//     description: "+2 defense vs ranged attacks",
//     cost: 6,
//   },
// ];

export default function Card({
  attackSkill,
  defense,
  edit = false,
  facets,
  influence,
  mm,
  name,
  onFacetEdit = null,
  onFacetDelete = null,
  size,
  strides,
  wounds,
}) {
  return (
    <section id="characterCard" className={classNames.characterCard}>
      <div id="topRow" className={classNames.characterCardRow}>
        <div id="coreInfo" className={classNames.coreInfo}>
          <div id="name" className={classNames.nameRow}>{name || "Character Name"}</div>
          <div id="baseStats" className={classNames.baseStats}>
            <span className="inline-block flex-1">
              <div className="flex flex-col items-center justify-center">
                <div>📐</div>
                <div>{size}<span className="text-[8px]">({mm}mm)</span></div>
              </div>
            </span>
            <span className="inline-block flex-1">
              <div className="flex flex-col items-center justify-center">
                <div>{STATS_SYMBOLS.INFLUENCE}</div>
                <div>{influence}&quot;</div>
              </div>
            </span>
            <span className="inline-block flex-1">
              <div className="flex flex-col items-center justify-center">
                <div>{STATS_SYMBOLS.DEFENSE}</div>
                <div>{defense}</div>
              </div>
            </span>
          </div>
        </div>
        <div id="coreUsage" className={classNames.coreUsage}>
          <div className={classNames.coreUsageSquares}>
          {STATS_SYMBOLS.STRIDES}
          <span className="absolute top-0 left-0 top-[-3px] text-[16px]">
            {GAME_SYMBOLS.EXHAUSTION_SLOT}
          </span>
          <span className="absolute top-0 right-0 top-[-3px] text-[16px]">
            {strides}
          </span>
          <span className="absolute left-0 bottom-[-3] text-[16px]">
            {strides}
          </span>
        </div>
          <div className={classNames.coreUsageSquares}>
            {STATS_SYMBOLS.WOUNDS}
            <span className="absolute right-0 top-[-3px] text-[16px]">
              {wounds}
            </span>
            <span className="absolute left-0 bottom-[-3] text-[16px]">
              {wounds}
            </span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-wrap items-start gap-2 w-full min-h-[0.75in]"
        style={{ alignContent: 'flex-start' }}
      >
        {facets.map((item, idx) => (
          <Facet
            key={idx}
            attackSkill={attackSkill}
            edit={edit}
            onEdit={onFacetEdit ? () => onFacetEdit(idx, item) : null}
            onDelete={onFacetDelete ? () => onFacetDelete(idx, item) : null}
            {...item}
          />
        ))}
      </div>
    </section>
  )
}