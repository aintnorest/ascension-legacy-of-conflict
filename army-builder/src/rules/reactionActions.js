export const REACTION_ACTIONS = {
  negateDisplacement: {
    name: "Negate Displacement (Self)",
    description: "Cannot be pushed or thrown this attack",
    trigger: "When targeted by push or throw",
    cost: 12,
    category: "defensive",
    targeting: "self",
    effect: "Immunity to displacement for one attack"
  },
  reduceDisplacement: {
    name: "Reduce Displacement (Self, 2\")",
    description: "Reduce push/knockback distance by 2\"",
    trigger: "When pushed or knocked back",
    cost: 8,
    category: "defensive",
    targeting: "self",
    effect: "Reduce displacement distance by 2\""
  },
  displaceSelfReaction: {
    name: "Displace Self (Reaction, 1\")",
    description: "Move 1\" before attack resolves",
    trigger: "When targeted by an attack",
    cost: 8,
    category: "evasive",
    targeting: "self",
    range: "1\"",
    effect: "Move 1\" before attack resolution"
  },
  increaseDefense: {
    name: "Increase Defense",
    description: "Draw 3 cards for defense and discard 1 of player's choice",
    trigger: "When targeted by an attack",
    cost: 8,
    category: "defensive",
    targeting: "self",
    effect: "Draw 3 defense cards, discard 1"
  }
};
