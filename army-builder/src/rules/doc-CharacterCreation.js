import {
  STATS_SYMBOLS,
  ACTION_SYMBOLS,
  SUIT_SYMBOLS,
  GAME_SYMBOLS,
  ATTACK_TEMPLATE_SYMBOLS,
  ATTACK_MODIFIER_SYMBOLS,
} from "./symbols";

const pointBuySystem = {
  name: "Point Buy System",
  description: `
Characters are created using a point buy system. Points are spent to:

- select a size
- edit stats
- add attack actions
- add abilities
- add reactions
  `,
};

const symbologyGuide = {
  name: "Symbology Guide",
  description: `
The following symbology and their meaning. More detailed descriptions can be found in specific rules documentation.

Core Stats:

- ${STATS_SYMBOLS.STRIDES} Strides
- ${STATS_SYMBOLS.WOUNDS} Wounds
- ${STATS_SYMBOLS.INFLUENCE} Influence
- ${STATS_SYMBOLS.ATTACK_SKILL} Attack Skill
- ${STATS_SYMBOLS.DEFENSE} Defense

Exhaustion:

- ${GAME_SYMBOLS.EXHAUSTION} Exhaustion

Facet Types:

- ${ACTION_SYMBOLS.ACTION} Action
- ${ACTION_SYMBOLS.REACTION} Reaction
- ${ACTION_SYMBOLS.INSTANT} Instant
- ${ACTION_SYMBOLS.PASSIVE} Passive

Attack Templates:

- ${ATTACK_TEMPLATE_SYMBOLS.SINGLE_TARGET} Single Target
- ${ATTACK_TEMPLATE_SYMBOLS.AREA} Area
- ${ATTACK_TEMPLATE_SYMBOLS.BREAKTHROUGH} Breakthrough
- ${ATTACK_TEMPLATE_SYMBOLS.RICOCHET} Ricochet

Attack Trigger Modifiers:

- ${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}: Triggered regardless of suit and attack success
- ${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.FAILURE}: Triggered regardless of suit and attack failure
- ${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}: Triggered regardless of suit and attack success or failure
- ${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}: Triggered on the presence of one clubs and attack success
- ${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.FAILURE}: Triggered on the presence of one clubs and attack failure
- ${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}: Triggered on the presence of one clubs and attack success or failure
- ${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}: Triggered on the presence of one diamond, one club, and attack success
- ${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.FAILURE}: Triggered on the presence of one diamond, one club, and attack failure
- ${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}: Triggered on the presence of one diamond, one club, and attack success or failure
- ${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}: Triggered on the presence of two clubs and attack success
- ${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.FAILURE}: Triggered on the presence of two clubs and attack failure
- ${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}: Triggered on the presence of two clubs and attack success or failure

Attack Template Modifiers:

- ${ATTACK_MODIFIER_SYMBOLS.RANGE}: Range (e.g., R:3" for 3-inch range)
- ${ATTACK_MODIFIER_SYMBOLS.AREA}: Area Diameter (e.g., A:2" for 2-inch diameter)
- ${ATTACK_MODIFIER_SYMBOLS.LINE}: Line Length (e.g., L:3" for 3-inch line length)
- ${ATTACK_MODIFIER_SYMBOLS.TARGETS}: Number of Targets (e.g., T:2 for 2 targets)
- ${ATTACK_MODIFIER_SYMBOLS.BETWEEN}: Range Between Targets (e.g., Btwn:2" for 2 inches between targets)
- ${ATTACK_MODIFIER_SYMBOLS.INITIAL_RANGE}: Initial Range, like Range but for the Ricochet attack template
  `,
};

const uniqueCharacterName = {
  name: "Unique Character Name",
  description: "Each character MUST have a unique name.",
};

const validModelSize = {
  name: "Valid Model Size",
  description: "The character's model base MUST be between 25mm and 170mm (inclusive).",
  min: 25,
  max: 170,
  unit: "mm",
};

const woundsStatRules = {
  name: "Wounds Stat Rules",
  description: "Each additional Wound beyond the model's Base Wounds costs progressively more.",
  maxUpgrades: 5,
  costType: "progressive",
  costs: [1, 2, 3, 4, 5],
  baseValue: "wounds", // property name in sizeRows
  icon: STATS_SYMBOLS.WOUNDS,
};

const defenseStatRules = {
  name: "Defense Stat Rules",
  description: "Each additional point of Defense beyond the base 2 costs progressively more.",
  maxUpgrades: 3,
  costType: "progressive",
  costs: [4, 6, 8],
  baseValue: "defense", // property name in sizeRows
  icon: STATS_SYMBOLS.DEFENSE,
};

const attackSkillStatRules = {
  name: "Attack Skill Stat Rules",
  description: "Each additional point of Attack Skill beyond the base 0 costs progressively more.",
  maxUpgrades: 6,
  costType: "progressive",
  costs: [3, 5, 7, 9, 11, 13],
  baseValue: "attackSkill", // property name in sizeRows
  icon: STATS_SYMBOLS.ATTACK_SKILL,
};

const stridesStatRules = {
  name: "Strides Stat Rules",
  description: "Each additional Stride beyond the model's Base Strides has a fixed cost based on the model's Size Value.",
  maxUpgrades: 3,
  costType: "size-based",
  costs: {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 5
  },
  baseValue: "strides", // property name in sizeRows
  icon: STATS_SYMBOLS.STRIDES,
};

const statRules = {
  name: "Stat Rules",
  description: "Rules for how to edit character stats.",
  rules: [
    woundsStatRules,
    defenseStatRules,
    attackSkillStatRules,
    stridesStatRules,
  ],
};

const minimumAttackActions = {
  name: "Minimum Attack Actions",
  description: "Each character MUST have at least one attack action.",
  min: 1,
};

const characterValidationRules = {
  name: "Character Validation Rules",
  description: "A character is valid only if it meets all of the following criteria:",
  rules: [
    uniqueCharacterName,
    validModelSize,
    statRules,
    minimumAttackActions,
  ],
};

const CharacterCreation = {
  name: "Character Creation",
  description: "Rules for creating characters in Ascension: Legacy of Conflict",
  rules: [
    pointBuySystem,
    symbologyGuide,
    characterValidationRules,
  ],
};

export default CharacterCreation;
