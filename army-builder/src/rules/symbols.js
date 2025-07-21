/**
 * Centralized symbols and emojis for the Ascension: Legacy of Conflict army builder app.
 * All visual symbols used throughout the application should be defined here
 * to ensure consistency and easy maintenance.
 */

// Character Base Stats
export const STATS_SYMBOLS = {
  STRIDES: `👟`,
  WOUNDS: `❤️`,
  INFLUENCE: `🌐`,
  ATTACK_SKILL: `⚔️`,
  DEFENSE: `🛡️`,
  SIZE: `📐`,
};

// Action Types
export const ACTION_SYMBOLS = {
  ACTION: `⭐`,
  RESPONSE: `💫`,
  TRAIT: `⚙️`,
};

// Action Token Symbols
export const ACTION_TOKEN_SYMBOLS = {
  SINGLE_TOKEN: `⭐`,
  DOUBLE_TOKEN: `⭐2`,
  // Generic function for any number of tokens
  TOKEN: count => count === 1 ? `⭐` : `⭐${count}`,
};

// Card Suits
export const SUIT_SYMBOLS = {
  SPADES: `♠️`,
  HEARTS: `♥️`,
  DIAMONDS: `♦️`,
  CLUBS: `♣️`,
  JOKER: `🃏`,
};

// General Game Symbols
export const GAME_SYMBOLS = {
  SUCCESS: `✔️`,
  FAILURE: `✖️`,
};

// Attack Template Symbols
export const ATTACK_TEMPLATE_SYMBOLS = {
  SINGLE_TARGET: `①`,
  AREA: `⭕`,
  BREAKTHROUGH: `📏`,
  RICOCHET: `🔗`,
};

export const ATTACK_MODIFIER_SYMBOLS = {
  RANGE: `R`,
  AREA: `A`,
  LINE: `L`,
  TARGETS: `T`,
  BETWEEN: `Btwn`,
  INITIAL_RANGE: `InitR`,
};

// Convenience object with all symbols
export const SYMBOLS = {
  ...STATS_SYMBOLS,
  ...ACTION_SYMBOLS,
  ...ACTION_TOKEN_SYMBOLS,
  ...SUIT_SYMBOLS,
  ...GAME_SYMBOLS,
  ...ATTACK_TEMPLATE_SYMBOLS,
  ...ATTACK_MODIFIER_SYMBOLS,
};
