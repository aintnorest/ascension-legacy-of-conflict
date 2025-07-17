import React from "react";

/*
**Attack Templates:**

* **①:** Single Target
* **⭕:** Area
* **📏:** Breakthrough
* **🔗:** Ricochet

**Attack Modifiers:**

* **R:** Range (e.g., R:3" for 3-inch range)
* **A:** Area Diameter (e.g., A:2" for 2-inch diameter)
* **L:** Line Length (e.g., L:3" for 3-inch line length)
* **T:** Number of Targets (e.g., T:2 for 2 targets)
* **Btwn:** Range Between Targets (e.g., Btwn:2" for 2 inches between targets)
* **InitR:** Initial Range (for Ricochet, e.g., InitR:4")

**Suit Dependencies:**

* **♠️:** Spades
* **♥️:** Hearts
* **♦️:** Diamonds
* **♣️:** Clubs
* **🃏:** Always

  Arc Burst (🔷, cost 17, total 29)
    * ⚔️ 0
    * ⭕ | R:2" (cost 4) | A:2" (cost 5)
    * 🃏: Hinder (cost 5)
    * ♻️x2 (cost -2)

  Hammer Blow (🔸, cost 5, total 10)
    * ⚔️ 0
    * ① | R:0" (Free)
    * 🃏: Hinder (cost 5)
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
          💤
            <span className="absolute top-0 right-0 top-[-3px] text-[16px]">
              {exhaust ?  "♻️" : ""}
            </span>
            <span className="absolute left-0 bottom-[-3] text-[16px]">
              {exhaust ?  "♻️" : ""}
            </span>
          </div>
        </div>
      )}
      { subType === "attack" && (
        <div id="content" className="h-[0.75in] w-fit flex flex-wrap items-start gap-0">
          <div id="facetName" className="font-bold w-fit whitespace-nowrap mb-[1px] mr-[4px]">🎬 {name}</div>
          <div className="w-fit whitespace-nowrap">⚔️:{primary ? attackSkill : Math.max(0, attackSkill - 2) }</div>
          {attackModifiers?.type === "singleTarget" && (
            <div className="w-fit whitespace-nowrap mb-[1px] pl-[2px]">① | R: {attackModifiers.r}&quot;</div>
          )}
          {attackModifiers?.type === "area" && (
            <div className="w-fit whitespace-nowrap mb-[1px] pl-[2px]">⭕ | R: {attackModifiers.r}&quot; | A: {attackModifiers.a}&quot;</div>
          )}
          {attackModifiers?.type === "breakthrough" && (
            <div className="w-fit whitespace-nowrap mb-[1px] pl-[2px]">📏 | L: {attackModifiers.l}&quot;</div>
          )}
          {attackModifiers?.type === "ricochet" && (
            <div className="w-fit whitespace-nowrap mb-[1px] pl-[2px]">🔗 | InitR: {attackModifiers.initR}&quot; | T: {attackModifiers.t} | Btwn: {attackModifiers.btwn}&quot;</div>
          )}
          {attackEffects?.map((effect, i) => (
            <div className="flex flex-col mb-[0px] w-full leading-[10px]" key={`${effect.type}-${i}`}>{effect.trigger}:{effect.description}</div>
          ))}
        </div>
      )}
      { subType === "reaction" && (
        <div id="content" className="h-[0.75in] w-fit flex flex-wrap items-start gap-0">
          <div id="facetName" className="font-bold w-fit whitespace-nowrap mb-[1px] mr-[4px]">↩️ {name}</div>
          <div className="text-[8px] text-gray-600 w-full mb-[1px]">
            <strong>Trigger:</strong> {trigger}
          </div>
          <div className="text-[8px] text-gray-600 w-full leading-[10px]">{description}</div>
        </div>
      )}
      {(type === "instant" || type === "passive" || type === "reaction") && (
        <div>
          <div id="facetName" className="font-bold w-fit whitespace-nowrap mb-[1px] mr-[4px]">
          {type === "instant" && "⚡️ "}
          {type === "passive" && "∞ "}
          {type === "reaction" && "↩️ "}
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