/**
 * Centralized symbols and emojis for the Ascension: Legacy of Conflict army builder app.
 * All visual symbols used throughout the application should be defined here 
 * to ensure consistency and easy maintenance.
 */

// Character Base Stats
export const STATS_SYMBOLS = {
  STRIDES: "👟",
  WOUNDS: "❤️", 
  INFLUENCE: "🌐",
  ATTACK_SKILL: "⚔️",
  DEFENSE: "🛡️"
};

// Action Types
export const ACTION_SYMBOLS = {
  ACTION: "🎬",
  REACTION: "↩️", 
  INSTANT: "⚡️",
  PASSIVE: "∞"
};

// Card Suits
export const SUIT_SYMBOLS = {
  SPADES: "♠️",
  HEARTS: "♥️",
  DIAMONDS: "♦️", 
  CLUBS: "♣️",
  JOKER: "🃏"
};

// General Game Symbols
export const GAME_SYMBOLS = {
  SUCCESS: "✔️",
  FAILURE: "✖️",
  EXHAUSTION: "💤",
  EXHAUSTION_SLOT: "♻️",
};

// Attack Template Symbols
export const ATTACK_TEMPLATE_SYMBOLS = {
  SINGLE_TARGET: "①",
  AREA: "⭕",
  BREAKTHROUGH: "📏",
  RICOCHET: "🔗"
};

export const ATTACK_MODIFIER_SYMBOLS = {
  RANGE: "R",
  AREA: "A",
  LINE: "L",
  TARGETS: "T",
  BETWEEN: "Btwn",
  INITIAL_RANGE: "InitR"
};

// Convenience object with all symbols
export const SYMBOLS = {
  ...STATS_SYMBOLS,
  ...ACTION_SYMBOLS, 
  ...SUIT_SYMBOLS,
  ...GAME_SYMBOLS,
  ...ATTACK_TEMPLATE_SYMBOLS,
  ...ATTACK_MODIFIER_SYMBOLS,
};

// Helper functions for commonly used symbol combinations
export const getStatSymbol = (statType) => {
  const symbolMap = {
    'strides': STATS_SYMBOLS.STRIDES,
    'wounds': STATS_SYMBOLS.WOUNDS,
    'influence': STATS_SYMBOLS.INFLUENCE,
    'attackSkill': STATS_SYMBOLS.ATTACK_SKILL,
    'defense': STATS_SYMBOLS.DEFENSE
  };
  return symbolMap[statType] || '';
};

export const getActionSymbol = (actionType) => {
  const symbolMap = {
    'action': ACTION_SYMBOLS.ACTION,
    'reaction': ACTION_SYMBOLS.REACTION,
    'instant': ACTION_SYMBOLS.INSTANT,
    'passive': ACTION_SYMBOLS.PASSIVE
  };
  return symbolMap[actionType] || '';
};

export const getSuitSymbol = (suit) => {
  const symbolMap = {
    'spades': SUIT_SYMBOLS.SPADES,
    'hearts': SUIT_SYMBOLS.HEARTS,
    'diamonds': SUIT_SYMBOLS.DIAMONDS,
    'clubs': SUIT_SYMBOLS.CLUBS,
    'joker': SUIT_SYMBOLS.JOKER,
    'always': SUIT_SYMBOLS.JOKER
  };
  return symbolMap[suit] || '';
};

export const getAttackTemplateSymbol = (template) => {
  const symbolMap = {
    'singleTarget': ATTACK_TEMPLATE_SYMBOLS.SINGLE_TARGET,
    'area': ATTACK_TEMPLATE_SYMBOLS.AREA,
    'breakthrough': ATTACK_TEMPLATE_SYMBOLS.BREAKTHROUGH,
    'ricochet': ATTACK_TEMPLATE_SYMBOLS.RICOCHET
  };
  return symbolMap[template] || '';
};
