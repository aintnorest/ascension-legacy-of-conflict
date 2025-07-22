/**
 * Shared utilities for action view components (AbilityActionView, ResponseActionView, etc.)
 * Contains common patterns for filtering, custom names, and card rendering.
 */

/**
 * Groups actions by category for filtering
 * @param {Object} actions - Object with action data
 * @returns {Object} Actions grouped by category
 */
export function groupActionsByCategory(actions) {
  return Object.entries(actions).reduce((groups, [key, action]) => {
    const category = action.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push({ key, ...action });
    return groups;
  }, {});
}

/**
 * Gets filtered actions based on selected category
 * @param {Object} actions - All actions
 * @param {Object} groupedActions - Actions grouped by category
 * @param {string} selectedCategory - Currently selected category filter
 * @returns {Array} Filtered actions array
 */
export function getFilteredActions(actions, groupedActions, selectedCategory) {
  return selectedCategory === `all`
    ? Object.entries(actions).map(([key, action]) => ({ key, ...action }))
    : groupedActions[selectedCategory] || [];
}

/**
 * Creates category filter buttons data
 * @param {Object} groupedActions - Actions grouped by category
 * @returns {Array} Array of category names including 'all'
 */
export function getCategoryOptions(groupedActions) {
  return [`all`, ...Object.keys(groupedActions).sort()];
}

/**
 * Handles custom name state updates
 * @param {Function} setCustomNames - State setter function
 * @param {string} actionKey - Key of the action being updated
 * @param {string} value - New custom name value
 */
export function handleCustomNameChange(setCustomNames, actionKey, value) {
  setCustomNames(prev => ({
    ...prev,
    [actionKey]: value,
  }));
}

/**
 * Clears custom name after adding an action
 * @param {Function} setCustomNames - State setter function
 * @param {string} actionKey - Key of the action to clear
 */
export function clearCustomName(setCustomNames, actionKey) {
  setCustomNames((prev) => {
    const updated = { ...prev };
    delete updated[actionKey];
    return updated;
  });
}

/**
 * Common action details rendering helper
 * @param {Object} action - Action object
 * @param {Array} fieldsToShow - Array of field names to display
 * @returns {Array} Array of detail strings
 */
export function renderActionDetails(action, fieldsToShow = []) {
  const details = [];

  fieldsToShow.forEach((field) => {
    if (action[field] !== undefined) {
      const label = field.charAt(0).toUpperCase() + field.slice(1);
      let value = action[field];

      // Special formatting for certain fields
      if (field === `requiresLOS` && typeof value === `boolean`) {
        value = value ? `Required` : `Not Required`;
      }

      details.push(`${label}: ${value}`);
    }
  });

  return details;
}

/**
 * Shared class names for action view components
 * @param {string} primaryColor - Primary color name (e.g., 'blue', 'purple')
 * @returns {Object} Object with shared class names
 */
export function getSharedActionViewClasses(primaryColor = `blue`) {
  return {
    container: `bg-white rounded-lg p-4 flex flex-col gap-6 text-black`,
    title: `text-lg font-semibold`,
    description: `flex flex-col gap-2 text-sm text-gray-600`,
    section: `flex flex-col gap-2`,
    label: `font-medium`,
    input: `border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${primaryColor}-500 bg-gray-50`,
    categoryFilter: `flex gap-2 mb-4`,
    categoryButton: `px-3 py-1 rounded border transition-colors`,
    categoryButtonActive: `bg-${primaryColor}-500 text-white border-${primaryColor}-500`,
    categoryButtonInactive: `bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200`,
    actionGrid: `grid gap-3`,
    actionCard: `border rounded-lg p-4 bg-gray-50`,
    actionHeader: `flex justify-between items-start mb-2`,
    actionName: `font-medium text-gray-900`,
    actionCost: `text-lg font-bold text-${primaryColor}-600`,
    actionDescription: `text-sm text-gray-600 mb-3`,
    actionDetails: `text-xs text-gray-500 space-y-1`,
    customNameSection: `mt-3`,
    customNameLabel: `block text-sm font-medium text-gray-700 mb-1`,
    customNameInput: `w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-${primaryColor}-500`,
    addButton: `bg-${primaryColor}-500 text-white px-4 py-2 rounded hover:bg-${primaryColor}-600 transition-colors`,
    addButtonDisabled: `bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed`,
    rules: `bg-${primaryColor}-50 border border-${primaryColor}-200 rounded-lg p-3 mb-4 text-sm text-${primaryColor}-800`,
    limitWarning: `bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-yellow-800`,
    // Legacy aliases for backward compatibility
    abilityGrid: `grid gap-3`,
    abilityCard: `border rounded-lg p-4 bg-gray-50`,
    abilityHeader: `flex justify-between items-start mb-2`,
    abilityName: `font-medium text-gray-900`,
    abilityCost: `text-lg font-bold text-${primaryColor}-600`,
    abilityDescription: `text-sm text-gray-600 mb-3`,
    abilityDetails: `text-xs text-gray-500 space-y-1`,
    responseGrid: `grid gap-3`,
    responseCard: `border rounded-lg p-4 bg-gray-50`,
    responseHeader: `flex justify-between items-start mb-2`,
    responseName: `font-medium text-gray-900`,
    responseCost: `text-lg font-bold text-${primaryColor}-600`,
    responseDescription: `text-sm text-gray-600 mb-3`,
    responseDetails: `text-xs text-gray-500 space-y-1`,
  };
}
