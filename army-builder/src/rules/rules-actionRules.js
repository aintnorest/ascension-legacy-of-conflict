import { attackActionRules } from "./rules-attackActions";
import { abilityActionRules } from "./rules-abilityActions";
import { responseActionTable } from "./rules-responseActions";

export const actionRules = {
  name: `Action Rules`,
  description: `This section details rules for creating & purchasing Actions.

Action Token Economy:
Each character gains Action Tokens equal to the number of actions they possess. This means characters with more actions have more Action Tokens available during their activation, allowing for greater tactical flexibility and the ability to perform more actions per turn.

For example:

- A character with 2 actions gains 2 Action Tokens per activation
- A character with 4 actions gains 4 Action Tokens per activation

Action Token Cost:
Actions require spending Action Tokens to activate. Some actions have multiple options for how many tokens to spend:

- ⭐ (1 Action Token)
- ⭐2 (2 Action Tokens)

Actions that allow spending more tokens typically provide enhanced effects, greater range, more damage, or additional benefits when more tokens are used.`,
  rules: [
    attackActionRules,
    abilityActionRules,
    responseActionTable,
  ],
};
