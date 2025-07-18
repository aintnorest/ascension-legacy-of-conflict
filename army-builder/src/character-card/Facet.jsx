import React from "react";
import {
  ACTION_SYMBOLS,
  ATTACK_MODIFIER_SYMBOLS,
  ATTACK_TEMPLATE_SYMBOLS,
  GAME_SYMBOLS,
  STATS_SYMBOLS,
} from '@/rules/symbols';

/*
**Attack Templates:**

* **{ATTACK_TEMPLATE_SYMBOLS.SINGLE_TARGET}:** Single Target
* **{ATTACK_TEMPLATE_SYMBOLS.AREA}:** Area
* **{ATTACK_TEMPLATE_SYMBOLS.BREAKTHROUGH}:** Breakthrough
* **{ATTACK_TEMPLATE_SYMBOLS.RICOCHET}:** Ricochet

**Attack Modifiers:**

* **R:** Range (e.g., R:3" for 3-inch range)
* **A:** Area Diameter (e.g., A:2" for 2-inch diameter)
* **L:** Line Length (e.g., L:3" for 3-inch line length)
* **T:** Number of Targets (e.g., T:2 for 2 targets)
* **Btwn:** Range Between Targets (e.g., Btwn:2" for 2 inches between targets)
* **InitR:** Initial Range (for Ricochet, e.g., InitR:4")

**Suit Dependencies:**

* **{SUIT_SYMBOLS.SPADES}:** Spades
* **{SUIT_SYMBOLS.HEARTS}:** Hearts
* **{SUIT_SYMBOLS.DIAMONDS}:** Diamonds
* **{SUIT_SYMBOLS.CLUBS}:** Clubs
* **{SUIT_SYMBOLS.JOKER}:** Always

  Arc Burst (🔷, cost 17, total 29)
    * {STATS_SYMBOLS.ATTACK_SKILL} 0
    * {ATTACK_TEMPLATE_SYMBOLS.AREA} | R:2" (cost 4) | A:2" (cost 5)
    * {SUIT_SYMBOLS.JOKER}: Hinder (cost 5)
    * {GAME_SYMBOLS.EXHAUSTION}x2 (cost -2)

  Hammer Blow (🔸, cost 5, total 10)
    * {STATS_SYMBOLS.ATTACK_SKILL} 0
    * {ATTACK_TEMPLATE_SYMBOLS.SINGLE_TARGET} | R:0" (Free)
    * {SUIT_SYMBOLS.JOKER}: Hinder (cost 5)
    * 
*/

const classNames = {
  exhaustedSlot: "relative w-[0.75in] h-[0.75in] aspect-square border-2 border-[#999] rounded bg-white flex items-center justify-center text-[34px]",
};

export default function Facet ({
  attackEffects,
  attackModifiers,
  attackSkill,
  description,
  edit = false,
  exhaust,
  name,
  onEdit = null,
  onDelete = null,
  primary,
  subType,
  trigger,
  type,
}) {
  const handleClick = () => {
    if (edit && onEdit) {
      onEdit();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div 
      className={`${(type === "action" || type === "reaction") ? "h-[0.75in]" : ""} flex-shrink-0 flex flex-row items-center gap-2 relative group ${
        edit ? "cursor-pointer hover:bg-blue-50 hover:border-blue-300 border border-transparent rounded p-1" : ""
      }`}
      onClick={handleClick}
    >
      {edit && onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-0 right-0 z-10 w-4 h-4 bg-red-500 hover:bg-red-600 text-white text-[8px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete facet"
        >
          🗑️
        </button>
      )}
      {(type === "action" || type === "reaction") && (
        <div id="exhaustedSlot" className={classNames.exhaustedSlot}>
          <div className={classNames.coreUsageSquares}>
          {GAME_SYMBOLS.EXHAUSTION_SLOT}
            <span className="absolute top-0 right-0 top-[-3px] text-[16px]">
              {exhaust ? GAME_SYMBOLS.EXHAUSTION : ""}
            </span>
            <span className="absolute left-0 bottom-[-3] text-[16px]">
              {exhaust ? GAME_SYMBOLS.EXHAUSTION : ""}
            </span>
          </div>
        </div>
      )}
      { subType === "attack" && (
        <div id="content" className="h-[0.75in] w-fit flex flex-wrap items-start gap-0">
          <div id="facetName" className="font-bold w-fit whitespace-nowrap mb-[1px] mr-[4px]">{ACTION_SYMBOLS.ACTION} {name}</div>
          <div className="w-fit whitespace-nowrap">{STATS_SYMBOLS.ATTACK_SKILL}:{primary ? attackSkill : Math.max(0, attackSkill - 2) }</div>
          {attackModifiers?.type === "singleTarget" && (
            <div className="w-fit whitespace-nowrap mb-[1px] pl-[2px]">{ATTACK_TEMPLATE_SYMBOLS.SINGLE_TARGET} | {ATTACK_MODIFIER_SYMBOLS.RANGE}: {attackModifiers.r}&quot;</div>
          )}
          {attackModifiers?.type === "area" && (
            <div className="w-fit whitespace-nowrap mb-[1px] pl-[2px]">{ATTACK_TEMPLATE_SYMBOLS.AREA} | {ATTACK_MODIFIER_SYMBOLS.RANGE}: {attackModifiers.r}&quot; | {ATTACK_MODIFIER_SYMBOLS.AREA}: {attackModifiers.a}&quot;</div>
          )}
          {attackModifiers?.type === "breakthrough" && (
            <div className="w-fit whitespace-nowrap mb-[1px] pl-[2px]">{ATTACK_TEMPLATE_SYMBOLS.BREAKTHROUGH} | {ATTACK_MODIFIER_SYMBOLS.LINE}: {attackModifiers.l}&quot;</div>
          )}
          {attackModifiers?.type === "ricochet" && (
            <div className="w-fit whitespace-nowrap mb-[1px] pl-[2px]">{ATTACK_TEMPLATE_SYMBOLS.RICOCHET} | {ATTACK_MODIFIER_SYMBOLS.INITIAL_RANGE}: {attackModifiers.initR}&quot; | {ATTACK_MODIFIER_SYMBOLS.TARGETS}: {attackModifiers.t} | {ATTACK_MODIFIER_SYMBOLS.BETWEEN}: {attackModifiers.btwn}&quot;</div>
          )}
          {attackEffects?.map((effect, i) => (
            <div className="flex flex-col mb-[0px] w-full leading-[10px]" key={`${effect.type}-${i}`}>{effect.trigger}:{effect.description}</div>
          ))}
        </div>
      )}
      { subType === "reaction" && (
        <div id="content" className="h-[0.75in] w-fit flex flex-col flex-wrap items-start gap-0">
          <div id="facetName" className="font-bold w-fit whitespace-nowrap mb-[3px] mr-[4px]">{ACTION_SYMBOLS.REACTION} {name}</div>
          <div className="flex flex-row mb-[0px] w-fit leading-[10px]">
            <strong className="mr-1">Trigger:</strong>
            {trigger}
          </div>
          <div className="flex flex-col mb-[0px] w-fit leading-[10px]">
            <strong className="mr-1">Description:</strong>
            {description}
          </div>
        </div>
      )}
      {(type === "instant" || type === "passive") && (
        <div>
          <div id="facetName" className="font-bold w-fit whitespace-nowrap mb-[1px] mr-[4px]">
          {type === "instant" && `${ACTION_SYMBOLS.INSTANT} `}
          {type === "passive" && `${ACTION_SYMBOLS.PASSIVE} `}
          {type === "reaction" && `${ACTION_SYMBOLS.REACTION} `}
          {name}
        </div>
          <div> {description}</div>
          {type === "reaction" && (
            <div className="text-[8px] text-gray-600 mt-1">
              <strong>Trigger:</strong> {trigger}
            </div>
          )}
        </div>
      )}
    </div>
  );
}