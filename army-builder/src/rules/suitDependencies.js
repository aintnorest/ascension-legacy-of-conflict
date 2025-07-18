import { SUIT_SYMBOLS } from './symbols.js';

export const SUIT_DEPENDENCIES = {
  always: {
    symbol: SUIT_SYMBOLS.JOKER,
    name: "Always",
    description: "Effect activates regardless of the suits flipped"
  },
  matchSuit: {
    symbol: SUIT_SYMBOLS.CLUBS,
    name: "Match Suit",
    description: "Effect activates only if at least one of the specified suit is flipped"
  },
  twoSuit: {
    symbol: `${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}`,
    name: "Two Different Suits",
    description: "Effect activates only if one of each specified suit is flipped"
  },
  bothSuits: {
    symbol: `${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}`,
    name: "Both Same Suit",
    description: "Effect activates only if both cards flipped are the same specified suit"
  }
};
