import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RESPONSE_ACTIONS, RESPONSE_ACTION_RULES } from "@/rules/rules-responseActions";
import {
  groupActionsByCategory,
  getFilteredActions,
  getCategoryOptions,
  handleCustomNameChange,
  clearCustomName,
  renderActionDetails,
  getSharedActionViewClasses,
} from "./actionViewHelpers";

const classNames = getSharedActionViewClasses(`purple`);

export default function ResponseActionView({ onAddResponseAction }) {
  const [selectedCategory, setSelectedCategory] = useState(`all`);
  const [customNames, setCustomNames] = useState({});

  // Group response actions by category using shared helper
  const groupedResponses = groupActionsByCategory(RESPONSE_ACTIONS);
  const categories = getCategoryOptions(groupedResponses);

  // Filter response actions based on selected category using shared helper
  const filteredResponses = getFilteredActions(
    RESPONSE_ACTIONS,
    groupedResponses,
    selectedCategory,
  );

  const handleAddResponse = (responseKey, response) => {
    if (!onAddResponseAction) return;

    const customName = customNames[responseKey]?.trim();

    const responseData = {
      id: uuidv4(),
      type: `action`,
      subType: `response`,
      name: customName || response.name,
      description: response.description,
      cost: response.cost,
      category: response.category,
      trigger: response.trigger,
      effect: response.effect,
      ...(response.range && { range: response.range }),
    };

    onAddResponseAction(responseData);

    // Clear custom name after adding using shared helper
    clearCustomName(setCustomNames, responseKey);
  };

  const renderResponseDetails = (response) => {
    return renderActionDetails(response, [`trigger`, `range`, `effect`]);
  };

  const renderRulesSection = () => {
    return (
      <div className={classNames.rules}>
        <div className="mb-2">
          <strong>Response Action Rules:</strong>
        </div>
        <div className="space-y-1">
          <p>
            Custom names are optional and help personalize your character
          </p>
          {Object.entries(RESPONSE_ACTION_RULES).map(([ruleKey, rule]) => (
            <p key={ruleKey}>
              •
              {` `}
              {rule.description}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={classNames.container}>
      <h1 className={classNames.title}>Add Response Action</h1>

      <div className={classNames.description}>
        <p>
          Response actions trigger in response to specific events during gameplay.
        </p>
      </div>

      {renderRulesSection()}

      {/* Category Filter */}
      <div className={classNames.section}>
        <div className={classNames.label}>Filter by Category:</div>
        <div className={classNames.categoryFilter}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${classNames.categoryButton} ${
                selectedCategory === category
                  ? classNames.categoryButtonActive
                  : classNames.categoryButtonInactive
              }`}
            >
              {category === `all` ? `All` : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Response Actions List */}
      <div className={classNames.section}>
        <div className={classNames.label}>
          Available Response Actions
          {selectedCategory !== `all` && ` (${selectedCategory})`}
        </div>
        <div className={classNames.responseGrid}>
          {filteredResponses.map((response) => {
            const details = renderResponseDetails(response);

            return (
              <div key={response.key} className={classNames.responseCard}>
                <div className={classNames.responseHeader}>
                  <h4 className={classNames.responseName}>{response.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={classNames.responseCost}>{response.cost}</span>
                    <button
                      onClick={() => handleAddResponse(response.key, response)}
                      className={classNames.addButton}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <p className={classNames.responseDescription}>{response.description}</p>

                {details.length > 0 && (
                  <div className={classNames.responseDetails}>
                    {details.map((detail, index) => (
                      <p key={index}>
                        •
                        {` `}
                        {detail}
                      </p>
                    ))}
                  </div>
                )}

                <div className={classNames.customNameSection}>
                  <label htmlFor={`custom-name-${response.key}`} className={classNames.customNameLabel}>
                    Custom Name (optional):
                  </label>
                  <input
                    type="text"
                    id={`custom-name-${response.key}`}
                    placeholder={`e.g., "Counter Strike" (default: ${response.name})`}
                    value={customNames[response.key] || ``}
                    onChange={e => handleCustomNameChange(
                      setCustomNames,
                      response.key,
                      e.target.value,
                    )}
                    className={classNames.customNameInput}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredResponses.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No response actions found in the selected category.
        </div>
      )}
    </div>
  );
}
