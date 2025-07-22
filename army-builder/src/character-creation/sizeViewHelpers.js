/**
 * Helper functions for SizeView component.
 * Contains utility functions for size validation, range checking, and data extraction.
 */

import { BASE_STATS_TABLE } from "@/rules/rules-stats";

/**
 * Gets the minimum size from the BASE_STATS_TABLE (excluding terrain-only entries).
 * @returns {number} Minimum size in mm
 */
export function getMinSize() {
  return Math.min(...BASE_STATS_TABLE.filter(row => !row.terrainOnly).map(row => row.min));
}

/**
 * Gets the maximum size from the BASE_STATS_TABLE (excluding terrain-only entries).
 * @returns {number} Maximum size in mm
 */
export function getMaxSize() {
  return Math.max(...BASE_STATS_TABLE.filter(row => !row.terrainOnly).map(row => row.max));
}

/**
 * Checks if the input is valid (between min-max mm from rules).
 * @param {string|number} input - The size input value
 * @returns {boolean} True if input is valid
 */
export function isInputValid(input) {
  const mm = parseInt(input, 10);
  if (isNaN(mm)) return false;
  return mm >= getMinSize() && mm <= getMaxSize();
}

/**
 * Gets the size data for the given input (excluding terrain-only entries).
 * @param {string|number} input - The size input value
 * @returns {Object|null} Size data or null if invalid
 */
export function getCurrentSizeData(input) {
  const mm = parseInt(input, 10);
  if (!isInputValid(input)) return null;
  return BASE_STATS_TABLE
    .filter(row => !row.terrainOnly)
    .find(row => mm >= row.min && mm <= row.max) || null;
}

/**
 * Checks if the input is valid and has a matching size category.
 * @param {string|number} input - The size input value
 * @returns {boolean} True if input is valid and matches a size category
 */
export function isInputValidAndMatchesCategory(input) {
  return isInputValid(input) && getCurrentSizeData(input) !== null;
}

/**
 * Checks if the input falls within a specific size range.
 * @param {string|number} input - The size input value
 * @param {Object} row - Size table row with min and max values
 * @returns {boolean} True if input falls within the row's range
 */
export function isInputInRange(input, row) {
  const mm = parseInt(input, 10);
  if (isNaN(mm)) return false;
  return mm >= row.min && mm <= row.max;
}
