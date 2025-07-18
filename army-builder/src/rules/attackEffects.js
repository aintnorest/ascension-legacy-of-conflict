import { SUIT_SYMBOLS, GAME_SYMBOLS } from './symbols.js';

const createSuitCombos = (base, twoSuit, oneSuit) => ({
  [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}`]: base + 2,
  [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.FAILURE}`]: base + 3,
  [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: base + 4,
  [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}`]: base,
  [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.FAILURE}`]: base + 1,
  [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: base + 2,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}`]: twoSuit,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.FAILURE}`]: twoSuit + 1,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: twoSuit + 2,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}`]: oneSuit,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.FAILURE}`]: oneSuit + 1,
  [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: oneSuit + 2
});

const ATTACK_EFFECTS = {
  movement: {
    category: 'Movement Effects',
    effects: {
      displaceAttacker: {
        name: 'Displace Attacker',
        description: 'Move attacker within 1" of target',
        costs: createSuitCombos(4, 2, 1)
      },
      displaceDefender: {
        name: 'Displace Defender',
        description: 'Move target within 1" of original position',
        costs: createSuitCombos(3, 1, 0)
      },
      knockback: {
        name: 'Knockback',
        description: 'Push target 1" directly away',
        costs: createSuitCombos(2, 1, 0)
      },
      throw: {
        name: 'Throw',
        description: 'Throw target if 2 sizes smaller',
        costs: createSuitCombos(5, 3, 2)
      },
      throwTerrain: {
        name: 'Throw Terrain',
        description: 'Throw terrain if 2 sizes smaller',
        costs: createSuitCombos(4, 2, 1)
      }
    }
  },
  temporary: {
    category: 'Temporary Effects',
    effects: {
      hinder: {
        name: 'Hinder',
        description: 'Add 1 Hinder Token to the Defender',
        costs: createSuitCombos(2, 1, 0)
      },
      slow: {
        name: 'Slow',
        description: 'Add 1 Slow Token to the Defender',
        costs: createSuitCombos(2, 1, 0)
      },
      weaken: {
        name: 'Weaken',
        description: 'Add 1 Weaken Token to the Defender',
        costs: createSuitCombos(2, 1, 0)
      }
    }
  },
  other: {
    category: 'Other Effects',
    effects: {
      damageOverTime: {
        name: 'Damage Over Time',
        description: 'Add 1 Damage Over Time Token to the Defender',
        costs: createSuitCombos(3, 2, 1)
      },
      nullStrike: {
        name: 'Null Strike',
        description: 'No damage dealt',
        costs: {
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}`]: -6,
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.FAILURE}`]: -5,
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: -4
        },
        restriction: 'Cannot be chosen unless at least one Always effect is present'
      },
      exhaust: {
        name: 'Exhaust',
        description: "Add 1 Exhaust Token to 1 of the Defender's Actions",
        costs: {
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}`]: 22,
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.FAILURE}`]: 25,
          [`${SUIT_SYMBOLS.JOKER}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: 28,
          [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}`]: 11,
          [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.FAILURE}`]: 14,
          [`${SUIT_SYMBOLS.CLUBS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: 17,
          [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}`]: 8,
          [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.FAILURE}`]: 11,
          [`${SUIT_SYMBOLS.CLUBS}${SUIT_SYMBOLS.DIAMONDS}${GAME_SYMBOLS.SUCCESS}${GAME_SYMBOLS.FAILURE}`]: 14
        }
      }
    }
  }
};

export { ATTACK_EFFECTS };
