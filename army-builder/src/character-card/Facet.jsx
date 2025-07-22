import React from "react";
import {
  ACTION_SYMBOLS,
  ACTION_TOKEN_SYMBOLS,
  ATTACK_MODIFIER_SYMBOLS,
  ATTACK_TEMPLATE_SYMBOLS,
  GAME_SYMBOLS,
  STATS_SYMBOLS,
} from '@/rules/symbols';
import { getEffectiveAttackSkill } from '@/character-creation/attackActionHelpers';
import TokenSlot from './TokenSlot';

const classNames = {
  attackContent: `h-[0.75in] flex-1 flex flex-wrap items-start gap-0 overflow-hidden`,
  reactionContent: `h-[0.75in] flex-1 flex flex-col flex-wrap items-start gap-0 overflow-hidden`,
  abilityContent: `h-[0.75in] flex-1 flex flex-col flex-wrap items-start gap-0 overflow-hidden`,
  traitContent: `flex-1 overflow-hidden`,
  deleteButton: `absolute top-0 right-0 z-10 w-4 h-4 bg-red-500 hover:bg-red-600 text-white text-[8px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`,
  tokenSlot: `ml-[-2px]`,
  facetNameAttack: `font-bold w-full whitespace-nowrap mb-[1px] mr-[4px]`,
  facetNameAbility: `font-bold w-full whitespace-nowrap mb-[1px] mr-[4px]`,
  facetNameResponse: `font-bold w-fit whitespace-nowrap mb-[3px] mr-[4px]`,
  facetNameTrait: `font-bold w-fit whitespace-nowrap mb-[1px] mr-[4px]`,
  attackModifiers: `w-full flex flex-wrap gap-0 mb-[1px]`,
  attackModifiersContent: `break-words`,
  attackEffect: `flex flex-col mb-[0px] w-full leading-[10px]`,
  abilityDescription: `w-full flex flex-col gap-1 text-[10px] leading-[12px]`,
  abilityDescriptionContent: `break-words`,
  abilityRange: `text-[8px] text-gray-600`,
  responseTrigger: `flex flex-row mb-[0px] w-fit leading-[10px]`,
  responseDescription: `flex flex-col mb-[0px] w-fit leading-[10px]`,
  responseLabel: `mr-1`,
  traitTrigger: `text-[8px] text-gray-600 mt-1`,
};

export default function Facet({
  attackEffects,
  attackModifiers,
  attackSkill,
  description,
  edit = false,
  name,
  onDelete = null,
  range,
  subType,
  trigger,
  type,
}) {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div
      className={`${(type !== `trait` && type !== `instant`) ? `h-[0.75in]` : (type === `trait` ? `max-h-[0.75in]` : ``)} w-full max-w-full flex-shrink-0 flex flex-row items-center gap-2 relative group border-2 border-[#999] rounded ${
        edit ? `hover:bg-blue-50 hover:border-blue-300 border` : ``
      }`}
    >
      {edit && onDelete && (
        <button
          onClick={handleDelete}
          className={classNames.deleteButton}
          title="Delete facet"
        >
          🗑️
        </button>
      )}
      {(type !== `trait` && type !== `passive` && type !== `instant`) && (
        <TokenSlot
          centerContent={
            subType === `attack`
              ? STATS_SYMBOLS.ATTACK_SKILL
              : subType === `ability`
                ? ACTION_SYMBOLS.ACTION
                : subType === `response`
                  ? ACTION_SYMBOLS.RESPONSE
                  : GAME_SYMBOLS.EXHAUSTION_SLOT
          }
          topLeft={ACTION_TOKEN_SYMBOLS.SINGLE_TOKEN}
          bottomLeft={subType === `attack` ? ACTION_TOKEN_SYMBOLS.DOUBLE_TOKEN : null}
          className={classNames.tokenSlot}
        />
      )}
      { subType === `attack` && (
        <div id="attackContent" className={classNames.attackContent}>
          <div id="facetName" className={classNames.facetNameAttack}>
            {name}
          </div>

          {/* Token Usage and Attack Modifiers Display */}
          <div className={classNames.attackModifiers}>
            <div className={classNames.attackModifiersContent}>
              {STATS_SYMBOLS.ATTACK_SKILL}
              {`(${ACTION_TOKEN_SYMBOLS.SINGLE_TOKEN}): ${getEffectiveAttackSkill(attackSkill, attackModifiers?.type, `single`)} - (${ACTION_TOKEN_SYMBOLS.DOUBLE_TOKEN}): ${getEffectiveAttackSkill(attackSkill, attackModifiers?.type, `double`)}`}
              {attackModifiers?.type && ` | `}
              {attackModifiers?.type === `singleTarget` && (
                <>
                  {ATTACK_TEMPLATE_SYMBOLS.SINGLE_TARGET}
                  {` | `}
                  {ATTACK_MODIFIER_SYMBOLS.RANGE}
                  :
                  {` `}
                  {attackModifiers.r}
                  &quot;
                </>
              )}
              {attackModifiers?.type === `area` && (
                <>
                  {ATTACK_TEMPLATE_SYMBOLS.AREA}
                  {` | `}
                  {ATTACK_MODIFIER_SYMBOLS.RANGE}
                  :
                  {` `}
                  {attackModifiers.r}
                  &quot; |
                  {` `}
                  {ATTACK_MODIFIER_SYMBOLS.AREA}
                  :
                  {` `}
                  {attackModifiers.a}
                  &quot;
                </>
              )}
              {attackModifiers?.type === `breakthrough` && (
                <>
                  {ATTACK_TEMPLATE_SYMBOLS.BREAKTHROUGH}
                  {` | `}
                  {ATTACK_MODIFIER_SYMBOLS.LINE}
                  :
                  {` `}
                  {attackModifiers.l}
                  &quot;
                </>
              )}
              {attackModifiers?.type === `ricochet` && (
                <>
                  {ATTACK_TEMPLATE_SYMBOLS.RICOCHET}
                  {` | `}
                  {ATTACK_MODIFIER_SYMBOLS.INITIAL_RANGE}
                  :
                  {` `}
                  {attackModifiers.initR}
                  &quot; |
                  {` `}
                  {ATTACK_MODIFIER_SYMBOLS.TARGETS}
                  :
                  {` `}
                  {attackModifiers.t}
                  {` | `}
                  {ATTACK_MODIFIER_SYMBOLS.BETWEEN}
                  :
                  {` `}
                  {attackModifiers.btwn}
                  &quot;
                </>
              )}
            </div>
          </div>
          {attackEffects?.map((effect, i) => (
            <div className={classNames.attackEffect} key={`${effect.type}-${i}`}>
              {effect.trigger}
              :
              {effect.description}
            </div>
          ))}
        </div>
      )}
      { subType === `ability` && (
        <div id="abilityContent" className={classNames.abilityContent}>
          <div id="facetName" className={classNames.facetNameAbility}>
            {name}
          </div>
          <div className={classNames.abilityDescription}>
            <div className={classNames.abilityDescriptionContent}>
              {description}
            </div>
            {range && (
              <div className={classNames.abilityRange}>
                Range:
                {` `}
                {range}
              </div>
            )}
          </div>
        </div>
      )}
      { (subType === `response`) && (
        <div id="reactionContent" className={classNames.reactionContent}>
          <div id="facetName" className={classNames.facetNameResponse}>
            {name}
          </div>
          <div className={classNames.responseTrigger}>
            <strong className={classNames.responseLabel}>Trigger:</strong>
            {trigger}
          </div>
          <div className={classNames.responseDescription}>
            <strong className={classNames.responseLabel}>Description:</strong>
            {description}
          </div>
        </div>
      )}
      {(type === `instant` || type === `passive` || type === `trait`) && (
        <div id="traitContent" className={classNames.traitContent}>
          <div id="facetName" className={classNames.facetNameTrait}>
            {type === `instant` && `${ACTION_SYMBOLS.INSTANT} `}
            {(type === `passive` || type === `trait`) && `${ACTION_SYMBOLS.TRAIT} `}
            {type === `reaction` && `${ACTION_SYMBOLS.RESPONSE} `}
            {name}
          </div>
          <div>
            {` `}
            {description}
          </div>
          {type === `reaction` && (
            <div className={classNames.traitTrigger}>
              <strong>Trigger:</strong>
              {` `}
              {trigger}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
