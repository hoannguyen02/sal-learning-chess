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
    limitMoves: 1,
    nextBlocks: [],
    pieces: [
      {
        isWhite: false,
        position: [0, 7],
        type: 'ROOK',
        isMoved: false,
      },
      {
        isWhite: true,
        position: [1, 3],
        type: 'ROOK',
        isMoved: true,
      },
      { isWhite: true, position: [5, 4], type: 'BISHOP' },
      { isWhite: false, position: [0, 5], type: 'BISHOP' },
      { isWhite: false, position: [7, 0], type: 'QUEEN' },
      { isWhite: true, position: [7, 6], isMoved: true, type: 'KING' },
      { isWhite: false, position: [2, 2], isMoved: true, type: 'KING' },
      { isWhite: true, position: [7, 1], type: 'KNIGHT' },
      { isWhite: false, position: [0, 6], type: 'KNIGHT' },
      {
        isWhite: true,
        position: [6, 5],
        line: 1,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: true,
        position: [6, 6],
        line: 1,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: true,
        position: [6, 7],
        line: 1,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: true,
        position: [5, 1],
        line: 2,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: true,
        position: [4, 0],
        line: 3,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: true,
        position: [1, 1],
        line: 7,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: false,
        position: [1, 0],
        line: 1,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: false,
        position: [1, 5],
        line: 1,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: false,
        position: [1, 6],
        line: 1,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: false,
        position: [1, 7],
        line: 1,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
      {
        isWhite: false,
        position: [2, 4],
        line: 1,
        canBeEnPassantCapture: false,
        type: 'PAWN',
      },
    ],
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
