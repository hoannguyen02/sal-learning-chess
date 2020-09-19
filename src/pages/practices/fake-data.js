import {
  initialBlacks,
  initialQueen,
  initialWhiteBishops,
  initialWhiteRooks,
} from '../../shared/utils';

export const FAKE_DATA = {
  ONE_MOVES: {
    item: {
      title: 'ONE MOVES',
      value: 'ONE_MOVES',
    },
    pieces: [...initialWhiteRooks(), ...initialBlacks()],
  },
  TWO_MOVES: {
    item: {
      title: 'TWO MOVES',
      value: 'TWO_MOVES',
    },
    pieces: [...initialWhiteBishops(), ...initialBlacks()],
  },
  THREE_MOVES: {
    item: {
      title: 'THREE MOVES',
      value: 'THREE_MOVES',
    },
    pieces: [initialQueen(true), ...initialBlacks()],
  },
};
