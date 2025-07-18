import { GAME_SYMBOLS } from './symbols.js';

export const EFFECT_TIMING = {
  onHit: {
    symbol: GAME_SYMBOLS.SUCCESS,
    name: "On Hit",
    description: "Effect applies only if the attack is successful"
  },
  onMiss: {
    symbol: GAME_SYMBOLS.FAILURE,
    name: "On Miss",
    description: "Effect applies only if the attack fails"
  },
  onHitOrMiss: {
    symbol: `${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`,
    name: "On Hit or Miss",
    description: "Effect applies regardless of whether the attack hits or misses"
  }
};
