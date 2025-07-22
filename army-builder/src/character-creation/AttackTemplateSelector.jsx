import React from "react";
import { ATTACK_TEMPLATES } from "@/rules/rules-attackActions";

const classNames = {
  inputGroup: `flex flex-col gap-2`,
  label: `font-medium`,
  select: `border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50`,
  templateGrid: `grid grid-cols-1 gap-2`,
  templateCardSelected: `p-3 border rounded cursor-pointer bg-blue-50 border-blue-300`,
  templateCardUnselected: `p-3 border rounded cursor-pointer bg-gray-50 border-gray-300`,
  templateIcon: `text-xl`,
  templateContent: `flex-1`,
  templateName: `font-semibold`,
  templateDesc: `text-sm text-gray-600`,
  templateCost: `text-sm font-medium`,
  configSection: `flex flex-col gap-4`,
  configTitle: `font-semibold`,
};

export default function AttackTemplateSelector({
  selectedTemplate,
  templateConfig,
  onTemplateChange,
  onConfigChange,
}) {
  return (
    <>
      {/* Template Selection */}
      <div className={classNames.inputGroup}>
        <label className={classNames.label}>Attack Template:</label>
        <div className={classNames.templateGrid}>
          {Object.entries(ATTACK_TEMPLATES).map(([key, template]) => (
            <div
              key={key}
              onClick={() => onTemplateChange(key)}
              className={
                selectedTemplate === key
                  ? classNames.templateCardSelected
                  : classNames.templateCardUnselected
              }
            >
              <div className="flex items-center gap-2">
                <span className={classNames.templateIcon}>{template.icon}</span>
                <div className={classNames.templateContent}>
                  <div className={classNames.templateName}>{template.name}</div>
                  <div className={classNames.templateDesc}>{template.description}</div>
                  <div className={classNames.templateCost}>
                    Base Cost:
                    {` `}
                    {template.baseCosts}
                    {` `}
                    points | Attack Skill Modifier:
                    {` `}
                    {template.attackSkillModifier >= 0 ? `+` : ``}
                    {template.attackSkillModifier}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template-specific Configuration */}
      {selectedTemplate && (
        <div className={classNames.configSection}>
          <h3 className={classNames.configTitle}>Template Configuration</h3>

          {selectedTemplate === `singleTarget` && (
            <div className={classNames.inputGroup}>
              <label className={classNames.label}>Range:</label>
              <select
                className={classNames.select}
                value={templateConfig.range || 0}
                onChange={e => onConfigChange({
                  ...templateConfig,
                  range: parseInt(e.target.value),
                })}
              >
                {ATTACK_TEMPLATES.singleTarget.rangeUpgrades.map(upgrade => (
                  <option key={upgrade.range} value={upgrade.range}>
                    {upgrade.label}
                    {` (+`}
                    {upgrade.cost}
                    {` points)`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedTemplate === `area` && (
            <>
              <div className={classNames.inputGroup}>
                <label className={classNames.label}>Range to Center:</label>
                <select
                  className={classNames.select}
                  value={templateConfig.range || 0}
                  onChange={e => onConfigChange({
                    ...templateConfig,
                    range: parseInt(e.target.value),
                  })}
                >
                  {ATTACK_TEMPLATES.area.rangeUpgrades.map(upgrade => (
                    <option key={upgrade.range} value={upgrade.range}>
                      {upgrade.label}
                      {` (+`}
                      {upgrade.cost}
                      {` points)`}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classNames.inputGroup}>
                <label className={classNames.label}>Area Diameter:</label>
                <select
                  className={classNames.select}
                  value={templateConfig.diameter || 0}
                  onChange={e => onConfigChange({
                    ...templateConfig,
                    diameter: parseInt(e.target.value),
                  })}
                >
                  {ATTACK_TEMPLATES.area.diameterUpgrades.map(upgrade => (
                    <option key={upgrade.diameter} value={upgrade.diameter}>
                      {upgrade.label}
                      {` (+`}
                      {upgrade.cost}
                      {` points)`}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {selectedTemplate === `breakthrough` && (
            <div className={classNames.inputGroup}>
              <label className={classNames.label}>Line Length:</label>
              <select
                className={classNames.select}
                value={templateConfig.length || 1}
                onChange={e => onConfigChange({
                  ...templateConfig,
                  length: parseInt(e.target.value),
                })}
              >
                {ATTACK_TEMPLATES.breakthrough.lengthUpgrades.map(upgrade => (
                  <option key={upgrade.length} value={upgrade.length}>
                    {upgrade.label}
                    {` (+`}
                    {upgrade.cost}
                    {` points)`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedTemplate === `ricochet` && (
            <>
              <div className={classNames.inputGroup}>
                <label className={classNames.label}>Number of Targets:</label>
                <select
                  className={classNames.select}
                  value={templateConfig.targets || 1}
                  onChange={e => onConfigChange({
                    ...templateConfig,
                    targets: parseInt(e.target.value),
                  })}
                >
                  {ATTACK_TEMPLATES.ricochet.targetUpgrades.map(upgrade => (
                    <option key={upgrade.targets} value={upgrade.targets}>
                      {upgrade.label}
                      {` (+`}
                      {upgrade.cost}
                      {` points)`}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classNames.inputGroup}>
                <label className={classNames.label}>Initial Range:</label>
                <select
                  className={classNames.select}
                  value={templateConfig.initialRange || 0}
                  onChange={e => onConfigChange({
                    ...templateConfig,
                    initialRange: parseInt(e.target.value),
                  })}
                >
                  {ATTACK_TEMPLATES.ricochet.initialRangeUpgrades.map(upgrade => (
                    <option key={upgrade.range} value={upgrade.range}>
                      {upgrade.label}
                      {` (+`}
                      {upgrade.cost}
                      {` points)`}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classNames.inputGroup}>
                <label className={classNames.label}>Range Between Targets:</label>
                <select
                  className={classNames.select}
                  value={templateConfig.betweenRange || 0}
                  onChange={e => onConfigChange({
                    ...templateConfig,
                    betweenRange: parseInt(e.target.value),
                  })}
                >
                  {ATTACK_TEMPLATES.ricochet.rangeBetweenUpgrades.map(upgrade => (
                    <option key={upgrade.range} value={upgrade.range}>
                      {upgrade.label}
                      {` (+`}
                      {upgrade.cost}
                      {` points)`}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
