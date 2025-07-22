import React, { useState } from "react";
import { BASE_STATS_TABLE, sizeCategorySelection } from "@/rules/rules-stats";
import { STATS_SYMBOLS } from "@/rules/symbols";
import {
  getMinSize,
  getMaxSize,
  isInputValid,
  getCurrentSizeData,
  isInputValidAndMatchesCategory,
  isInputInRange,
} from "./sizeViewHelpers";

const classNames = {
  container: `bg-white rounded-lg p-4 flex flex-col gap-4 text-black`,
  title: `text-lg font-semibold`,
  description: `flex flex-col gap-2`,
  inputSection: `flex flex-col gap-2`,
  inputLabel: `font-medium`,
  inputRow: `flex items-center gap-2`,
  sizeInput: `border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50 w-24`,
  sizeInputInvalid: `border border-red-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-50 w-24`,
  selectButton: `bg-sky-500 hover:bg-sky-700 text-white px-3 py-2 rounded transition cursor-pointer`,
  selectButtonDisabled: `bg-gray-300 text-gray-500 px-3 py-2 rounded cursor-not-allowed`,
  validationMessage: `text-sm text-red-600 mt-1`,
  table: `min-w-full mt-4 border border-gray-300 rounded text-[10px]`,
  tableHeader: `bg-gray-100`,
  tableHeaderCell: `px-4 py-2 border-b border-gray-300 text-left`,
  tableRow: `transition`,
  tableRowSelected: `bg-sky-200`,
  tableRowHover: `hover:bg-sky-100`,
  tableCell: `px-4 py-2 border-b border-gray-200`,
  statsTable: `min-w-full mt-8 border border-gray-300 rounded text-[10px]`,
  statsHeaderCell: `px-2 py-1 border-b border-gray-300 text-left`,
  statsCell: `px-2 py-1 border-b border-gray-200`,
};

export default function SizeView({ character, onUpdateCharacterSize }) {
  const [baseSizeInput, setBaseSizeInput] = useState(character.size?.mm?.toString() || ``);

  /**
   * Handles size selection by finding the appropriate size data and calling the update function.
   */
  function handleSizeSelect() {
    const mm = parseInt(baseSizeInput, 10);

    if (!isInputValid(baseSizeInput)) return;

    const sizeData = BASE_STATS_TABLE
      .filter(row => !row.terrainOnly)
      .find(row => mm >= row.min && mm <= row.max);

    if (sizeData) {
      const sizeInfo = {
        value: sizeData.value,
        mm: mm,
      };

      const baseStats = {
        attackSkill: sizeData.attackSkill,
        defense: sizeData.defense,
        influence: sizeData.influence,
        strides: sizeData.strides,
        wounds: sizeData.wounds,
      };

      onUpdateCharacterSize(sizeInfo, baseStats);
    }
  }

  return (
    <div className={classNames.container}>
      <h1 className={classNames.title}>Choose Size</h1>
      <div className={classNames.description}>
        <p>
          {sizeCategorySelection.description}
        </p>

        <div className={classNames.inputSection}>
          <label htmlFor="baseSize" className={classNames.inputLabel}>
            Model Base Size:
          </label>
          <div className={classNames.inputRow}>
            <input
              id="baseSize"
              type="number"
              min={getMinSize()}
              max={getMaxSize()}
              className={
                isInputValid(baseSizeInput) || !baseSizeInput
                  ? classNames.sizeInput
                  : classNames.sizeInputInvalid
              }
              value={baseSizeInput}
              onChange={e => setBaseSizeInput(e.target.value)}
              placeholder="mm"
            />
            <button
              className={
                isInputValidAndMatchesCategory(baseSizeInput)
                  ? classNames.selectButton
                  : classNames.selectButtonDisabled
              }
              onClick={handleSizeSelect}
              disabled={!isInputValidAndMatchesCategory(baseSizeInput)}
            >
              Select
            </button>
          </div>
          {baseSizeInput && !isInputValid(baseSizeInput) && (
            <div className={classNames.validationMessage}>
              Size must be between
              {` `}
              {getMinSize()}
              -
              {getMaxSize()}
              mm.
            </div>
          )}
          {baseSizeInput && isInputValid(baseSizeInput) && getCurrentSizeData(baseSizeInput) && (
            <div className="text-sm text-green-600 mt-1">
              Valid size
              {` `}
              {getCurrentSizeData(baseSizeInput).value}
              {` `}
              (
              {getCurrentSizeData(baseSizeInput).min}
              -
              {getCurrentSizeData(baseSizeInput).max}
              mm range)
            </div>
          )}
          {baseSizeInput && isInputValid(baseSizeInput) && !getCurrentSizeData(baseSizeInput) && (
            <div className={classNames.validationMessage}>
              No size category found for
              {` `}
              {baseSizeInput}
              mm. Please check the size ranges below.
            </div>
          )}
        </div>

        <table className={classNames.table}>
          <thead>
            <tr className={classNames.tableHeader}>
              <th className={classNames.tableHeaderCell}>Base Size</th>
              <th className={classNames.tableHeaderCell}>Size Value</th>
              <th className={classNames.tableHeaderCell}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {BASE_STATS_TABLE.filter(row => !row.terrainOnly).map(row => (
              <tr
                key={row.value}
                className={`${classNames.tableRow} ${
                  isInputInRange(baseSizeInput, row)
                    ? classNames.tableRowSelected
                    : classNames.tableRowHover
                }`}
              >
                <td className={classNames.tableCell}>
                  {`${row.min}-${row.max}mm`}
                </td>
                <td className={classNames.tableCell}>{row.value}</td>
                <td className={classNames.tableCell}>{row.sizeCost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className={classNames.statsTable}>
          <thead>
            <tr className={classNames.tableHeader}>
              <th className={classNames.statsHeaderCell}>Size</th>
              <th className={classNames.statsHeaderCell}>
                {STATS_SYMBOLS.STRIDES}
                {` `}
                Strides
              </th>
              <th className={classNames.statsHeaderCell}>
                {STATS_SYMBOLS.WOUNDS}
                {` `}
                Wounds
              </th>
              <th className={classNames.statsHeaderCell}>
                {STATS_SYMBOLS.INFLUENCE}
                {` `}
                Influence
              </th>
              <th className={classNames.statsHeaderCell}>
                {STATS_SYMBOLS.ATTACK_SKILL}
                {` `}
                Attack Skill
              </th>
              <th className={classNames.statsHeaderCell}>
                {STATS_SYMBOLS.DEFENSE}
                {` `}
                Defense
              </th>
            </tr>
          </thead>
          <tbody>
            {BASE_STATS_TABLE.filter(row => !row.terrainOnly).map(row => (
              <tr
                key={row.value}
                className={`${
                  isInputInRange(baseSizeInput, row)
                    ? classNames.tableRowSelected
                    : ``
                }`}
              >
                <td className={classNames.statsCell}>{row.value}</td>
                <td className={classNames.statsCell}>{row.strides}</td>
                <td className={classNames.statsCell}>{row.wounds}</td>
                <td className={classNames.statsCell}>{row.influence}</td>
                <td className={classNames.statsCell}>{row.attackSkill}</td>
                <td className={classNames.statsCell}>{row.defense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
