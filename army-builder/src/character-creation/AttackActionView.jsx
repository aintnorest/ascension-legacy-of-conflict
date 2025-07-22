import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  calculateAttackCost,
  getAttackModifiers,
  getEffectiveAttackSkill,
  getInitialTemplateConfig,
} from "./attackActionHelpers";
import {
  canAddMoreAttackEffects,
  getAttackEffectLimitInfo,
} from "@/rules/rules-attackEffects";
import AttackTemplateSelector from "./AttackTemplateSelector";
import AttackEffectsSelector from "./AttackEffectsSelector";
import { ACTION_TOKEN_SYMBOLS } from "@/rules/symbols";

const classNames = {
  container: `bg-white rounded-lg p-4 flex flex-col gap-6 text-black`,
  title: `text-lg font-semibold`,
  description: `flex flex-col gap-2 text-sm text-gray-600`,
  section: `flex flex-col gap-2`,
  label: `font-medium`,
  input: `border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50`,
  skillSection: `flex flex-col gap-2`,
  skillTitle: `font-medium`,
  skillDisplay: `p-2 bg-gray-100 border border-gray-300 rounded`,
  tokenInfo: `text-sm text-gray-600 mt-2`,
  effectLimitInfo: `p-2 bg-blue-50 border border-blue-300 rounded text-sm`,
  effectLimitWarning: `p-2 bg-yellow-50 border border-yellow-300 rounded text-sm text-yellow-800`,
  totalCost: `text-lg font-bold`,
  addButton: `bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`,
  addButtonDisabled: `bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed`,
};

export default function AttackActionView({ character, onAddAttackAction }) {
  const [actionName, setActionName] = useState(``);
  const [selectedTemplate, setSelectedTemplate] = useState(``);
  const [templateConfig, setTemplateConfig] = useState({});
  const [selectedEffects, setSelectedEffects] = useState([]);

  // Get attack skill from character
  const attackSkill = character?.stats?.attackSkill || 0;

  // Get effect limit information using the rule
  const effectLimitInfo = getAttackEffectLimitInfo(attackSkill, selectedEffects.length);

  // Update template config when template changes
  const handleTemplateChange = (templateKey) => {
    setSelectedTemplate(templateKey);
    setTemplateConfig(getInitialTemplateConfig(templateKey));
  };

  // Calculate total cost
  const totalCost = calculateAttackCost(selectedTemplate, templateConfig, selectedEffects);

  // Get effective attack skill for both token types (for display purposes)
  const doubleTokenSkill = selectedTemplate
    ? getEffectiveAttackSkill(attackSkill, selectedTemplate, `double`)
    : attackSkill;
  const singleTokenSkill = selectedTemplate
    ? getEffectiveAttackSkill(attackSkill, selectedTemplate, `single`)
    : Math.max(0, attackSkill - 2);

  // Handle adding an effect
  const handleAddEffect = (effect) => {
    if (canAddMoreAttackEffects(attackSkill, selectedEffects.length)) {
      setSelectedEffects([...selectedEffects, effect]);
    }
  };

  // Handle removing an effect
  const handleRemoveEffect = (index) => {
    setSelectedEffects(selectedEffects.filter((_, i) => i !== index));
  };

  // Handle saving the attack
  const handleSave = () => {
    if (!actionName || !selectedTemplate) return;

    const attackData = {
      id: uuidv4(),
      type: `action`,
      subType: `attack`,
      name: actionName,
      attackModifiers: getAttackModifiers(selectedTemplate, templateConfig),
      attackEffects: selectedEffects,
      cost: totalCost,
    };

    onAddAttackAction(attackData);

    // Reset form after adding
    setActionName(``);
    setSelectedTemplate(``);
    setTemplateConfig({});
    setSelectedEffects([]);
  };

  const canSave = actionName && selectedTemplate;

  return (
    <div className={classNames.container}>
      <h1 className={classNames.title}>Add Attack Action</h1>

      <div className={classNames.description}>
        Configure an Attack Action for your character. Attack actions use your Attack Skill
        modified by the chosen template and token usage.
      </div>

      {/* Action Name */}
      <div className={classNames.section}>
        <label className={classNames.label}>Action Name:</label>
        <input
          type="text"
          className={classNames.input}
          value={actionName}
          onChange={e => setActionName(e.target.value)}
          placeholder="Enter attack name"
        />
      </div>

      {/* Token Usage Information */}
      <div className={classNames.skillSection}>
        <h3 className={classNames.skillTitle}>Token Usage During Play:</h3>
        <div className={classNames.skillDisplay}>
          <div>
            <strong>
              {`${ACTION_TOKEN_SYMBOLS.DOUBLE_TOKEN}:`}
            </strong>
            {` Full Attack Skill: `}
            {doubleTokenSkill}
          </div>
          <div>
            <strong>
              {`${ACTION_TOKEN_SYMBOLS.SINGLE_TOKEN}:`}
            </strong>
            {` Attack Skill -2: `}
            {singleTokenSkill}
          </div>
        </div>
        <div className={classNames.tokenInfo}>
          During gameplay, players choose whether to spend one or two action tokens.
          Single token attacks have reduced effectiveness but allow more actions per turn.
        </div>
      </div>

      {/* Effect Limit Information */}
      <div className={classNames.skillSection}>
        <h3 className={classNames.skillTitle}>Attack Effects Limit:</h3>
        <div className={
          effectLimitInfo.atLimit
            ? classNames.effectLimitWarning
            : classNames.effectLimitInfo
        }
        >
          <div>
            <strong>Attack Skill:</strong>
            {` ${effectLimitInfo.attackSkill} allows up to ${effectLimitInfo.maxEffects} effect${effectLimitInfo.maxEffects !== 1 ? `s` : ``}`}
          </div>
          <div>
            <strong>Current Effects:</strong>
            {` ${effectLimitInfo.currentEffectCount}/${effectLimitInfo.maxEffects}`}
            {effectLimitInfo.atLimit ? ` (Maximum reached)` : ``}
          </div>
        </div>
        <div className={classNames.tokenInfo}>
          {effectLimitInfo.rule}
        </div>
      </div>

      {/* Template Selection */}
      <AttackTemplateSelector
        selectedTemplate={selectedTemplate}
        templateConfig={templateConfig}
        onTemplateChange={handleTemplateChange}
        onConfigChange={setTemplateConfig}
      />

      {/* Effects Selection */}
      <AttackEffectsSelector
        selectedEffects={selectedEffects}
        maxEffectsAllowed={effectLimitInfo.maxEffects}
        onAddEffect={handleAddEffect}
        onRemoveEffect={handleRemoveEffect}
      />

      {/* Cost Summary and Actions */}
      <div className={classNames.section}>
        <div className={classNames.totalCost}>
          {`Total Cost: `}
          {totalCost}
          {` points`}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={canSave ? classNames.addButton : classNames.addButtonDisabled}
          >
            Add Attack
          </button>
        </div>
      </div>
    </div>
  );
}
