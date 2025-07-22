import React from "react";
import { Tooltip } from "react-tooltip";
import Facet from './Facet';
import TokenSlot from './TokenSlot';
import { ACTION_TOKEN_SYMBOLS, STATS_SYMBOLS, ACTION_SYMBOLS } from '@/rules/symbols';
import { STAT_COSTS_AND_MAX } from '@/rules/rules-stats';
import { calculateActionTokens } from '@/rules/utils-characterCosts';

const classNames = {
  characterCard: `w-[4in] h-[6in] box-border border-2 border-[#222] rounded-lg p-[0.15in] bg-[#faf9f6] font-['Roboto_Condensed',Arial,Helvetica,sans-serif] text-[10px] text-black flex flex-col`,
  characterCardRow: `flex items-stretch w-full grid grid-cols-[1fr_auto] mb-[0.05in]`,
  coreInfo: `pr-[0.05in] relative flex flex-col justify-end w-full`,
  nameRow: `text-[14px] truncate overflow-hidden whitespace-nowrap absolute top-[-8px] left-[-3px] w-full z-10 p-0 px-0`,
  baseStats: `flex items-end h-full text-[16px] pb-1`,
  statColumn: `inline-block flex-1`,
  statContainer: `flex flex-col items-center justify-center`,
  statSize: `text-[8px]`,
  coreUsage: `flex gap-[0.05in]`,
  facetsContainer: `flex flex-wrap items-start gap-2 w-full min-h-[0.75in]`,
};

export default function Card({
  character,
  edit = false,
  onFacetDelete = null,
}) {
  // Combine all facets from different action types
  const allFacets = [
    ...character.attackActions,
    ...character.abilityActions,
    ...character.responseActions,
    ...character.traits,
  ];

  return (
    <section className={classNames.characterCard}>
      {/* Top Row - Character Info and Core Stats */}
      <div className={classNames.characterCardRow}>
        <div className={classNames.coreInfo}>
          <div className={classNames.nameRow}>
            {character.name || `Character Name`}
          </div>
          <div className={classNames.baseStats}>
            <span
              className={classNames.statColumn}
              data-tooltip-id="size-tooltip"
              data-tooltip-content={STAT_COSTS_AND_MAX.size.description}
            >
              <div className={classNames.statContainer}>
                <div>{STATS_SYMBOLS.SIZE}</div>
                <div>
                  {character.size?.value || `?`}
                  <span className={classNames.statSize}>
                    (
                    {character.size?.mm || `?`}
                    mm)
                  </span>
                </div>
              </div>
            </span>
            <span
              className={classNames.statColumn}
              data-tooltip-id="influence-tooltip"
              data-tooltip-content={STAT_COSTS_AND_MAX.influence.description}
            >
              <div className={classNames.statContainer}>
                <div>{STATS_SYMBOLS.INFLUENCE}</div>
                <div>
                  {character.stats?.influence || `?`}
                  &quot;
                </div>
              </div>
            </span>
            <span
              className={classNames.statColumn}
              data-tooltip-id="defense-tooltip"
              data-tooltip-content={STAT_COSTS_AND_MAX.defense.description}
            >
              <div className={classNames.statContainer}>
                <div>{STATS_SYMBOLS.DEFENSE}</div>
                <div>{character.stats?.defense || `?`}</div>
              </div>
            </span>
            <span
              className={classNames.statColumn}
              data-tooltip-id="action-tokens-tooltip"
              data-tooltip-content="Total number of action tokens available."
            >
              <div className={classNames.statContainer}>
                <div>{ACTION_SYMBOLS.ACTION}</div>
                <div>{calculateActionTokens(character)}</div>
              </div>
            </span>
          </div>
        </div>
        <div className={classNames.coreUsage}>
          <TokenSlot
            centerContent={STATS_SYMBOLS.STRIDES}
            topLeft={ACTION_TOKEN_SYMBOLS.SINGLE_TOKEN}
            topRight={character.stats?.strides || `?`}
            bottomLeft={ACTION_TOKEN_SYMBOLS.DOUBLE_TOKEN}
            useTokenIcons={true}
            topRightAsStatValue={true}
            className="border-[#222]"
            data-tooltip-id="strides-tooltip"
            data-tooltip-content={STAT_COSTS_AND_MAX.strides.description}
          />
          <TokenSlot
            centerContent={STATS_SYMBOLS.WOUNDS}
            topRight={character.stats?.wounds || `?`}
            bottomLeft={character.stats?.wounds || `?`}
            useTokenIcons={false}
            className="border-[#222]"
            data-tooltip-id="wounds-tooltip"
            data-tooltip-content={STAT_COSTS_AND_MAX.wounds.description}
          />
        </div>
      </div>

      {/* Facets/Actions Container */}
      <div className={classNames.facetsContainer} style={{ alignContent: `flex-start` }}>
        {allFacets.map((facet, idx) => (
          <Facet
            key={facet.id || idx}
            attackSkill={character.stats?.attackSkill}
            edit={edit}
            onDelete={onFacetDelete ? () => onFacetDelete(facet.type, facet.id, facet) : null}
            {...facet}
          />
        ))}
      </div>

      {/* Tooltips */}
      <Tooltip id="size-tooltip" />
      <Tooltip id="influence-tooltip" />
      <Tooltip id="defense-tooltip" />
      <Tooltip id="action-tokens-tooltip" />
      <Tooltip id="strides-tooltip" />
      <Tooltip id="wounds-tooltip" />
    </section>
  );
}
