export const RESPONSE_ACTIONS = {
  negateDisplacement: {
    name: `Negate Displacement (Self)`,
    description: `Cannot be pushed or thrown this turn`,
    trigger: `When targeted by push or throw`,
    cost: 12,
    category: `defensive`,
  },
  reduceDisplacement: {
    name: `Reduce Displacement (Self, 2")`,
    description: `Reduce push or throw distance by 2"`,
    trigger: `When pushed or thrown`,
    cost: 8,
    category: `defensive`,
  },
  displaceSelfReaction: {
    name: `Displace Self (Reaction, 2")`,
    description: `Move 2" before attack resolves. If moved out of range, attack fails`,
    trigger: `When targeted by an attack`,
    cost: 8,
    category: `evasive`,
  },
  increaseDefense: {
    name: `Increase Defense`,
    description: `Draw 1 card for defense`,
    trigger: `When targeted by an attack`,
    cost: 8,
    category: `defensive`,
  },
};

export const RESPONSE_ACTION_RULES = {
  triggerRequirement: {
    description: `Each response requires a specific trigger event to activate`,
    enforcement: `mandatory`,
  },
  uniqueResponseRequirement: {
    description: `Unless explicitly stated otherwise, a model CANNOT purchase the same exact response more than once`,
    enforcement: `mandatory`,
  },
};

export const responseActionTable = {
  type: `table`,
  title: `Response Actions`,
  description: `Special actions that can be triggered in response to specific events during gameplay.
${RESPONSE_ACTION_RULES.triggerRequirement.description}
${RESPONSE_ACTION_RULES.uniqueResponseRequirement.description}`,
  headers: [`Response`, `Trigger`, `Description`, `Cost`],
  computeRows: () => {
    const rows = [];

    // Group reactions by category for better organization
    const categories = {};
    Object.entries(RESPONSE_ACTIONS).forEach(([_key, reaction]) => {
      if (!categories[reaction.category]) {
        categories[reaction.category] = [];
      }
      categories[reaction.category].push(reaction);
    });

    Object.entries(categories).forEach(([categoryName, reactions]) => {
      // Add category header
      rows.push([`**${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}**`, ``, ``, ``]);

      // Add reactions in this category
      reactions.forEach((reaction) => {
        rows.push([
          reaction.name,
          reaction.trigger,
          reaction.description,
          `${reaction.cost} points`,
        ]);
      });

      // Add spacing between categories
      rows.push([``, ``, ``, ``]);
    });

    // Remove last empty row
    if (rows.length > 0 && rows[rows.length - 1][0] === ``) {
      rows.pop();
    }

    return rows;
  },
};
