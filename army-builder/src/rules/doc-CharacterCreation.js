import {
  sizeCategorySelection,
  statAllocationRules,
} from "./rules-stats";
import { actionRules } from "./rules-actionRules";
import { traitsTable } from "./rules-traits";

import {
  STATS_SYMBOLS,
  ACTION_SYMBOLS,
  ACTION_TOKEN_SYMBOLS,
  SUIT_SYMBOLS,
  GAME_SYMBOLS,
  ATTACK_TEMPLATE_SYMBOLS,
  ATTACK_MODIFIER_SYMBOLS,
} from "./symbols";

const pointBuySystem = {
  name: `Point Buy System`,
  description: `
Characters are created using a point buy system. Points are spent to:

- select a size
- edit stats
- choose character Actions (Attack Actions,  Ability Actions, Trigger Actions)
- choose character Passive Abilities

  `,
};

const symbologyGuide = {
  name: `Symbology Guide`,
  description: `
The following symbology and their meaning. More detailed descriptions can be found in specific rules documentation.

Core Stats:

- ${STATS_SYMBOLS.STRIDES} Strides
- ${STATS_SYMBOLS.WOUNDS} Wounds
- ${STATS_SYMBOLS.INFLUENCE} Influence
- ${STATS_SYMBOLS.ATTACK_SKILL} Attack Skill
- ${STATS_SYMBOLS.DEFENSE} Defense

Action Token Costs:

- ${ACTION_TOKEN_SYMBOLS.SINGLE_TOKEN} Standard Action (1 Action Token)
- ${ACTION_TOKEN_SYMBOLS.DOUBLE_TOKEN} Intensive Action (2 Action Tokens)

Facet Types:

- ${ACTION_SYMBOLS.ACTION} Action both Attack and Ability Actions
- ${ACTION_SYMBOLS.RESPONSE} Response Actions
- ${ACTION_SYMBOLS.TRAIT} Traits

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

const CharacterCreation = {
  name: `Character Creation`,
  description: `Rules for creating characters in Ascension: Legacy of Conflict`,
  rules: [
    pointBuySystem,
    symbologyGuide,
    sizeCategorySelection,
    statAllocationRules,
    actionRules,
    traitsTable,
  ],
};

export default CharacterCreation;
