import { PieceType } from '../constants/piece-type';

export {
  initialPawnPieces,
  initialBlacks,
  initialWhites,
  initialRooks,
  initialWhiteRooks,
};
function initialPawnPieces(isWhite) {
  return [0, 1, 2, 3, 4, 5, 6, 7].map((item) => ({
    isWhite: isWhite,
    position: [isWhite ? 6 : 1, item],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  }));
}

function initialBlacks() {
  return [
    // Pawn
    ...initialPawnPieces(false),
    // Rook
    ...initialBlackRooks(),
    // Knight
    { isWhite: false, position: [0, 1], type: PieceType.KNIGHT },
    { isWhite: false, position: [0, 6], type: PieceType.KNIGHT },
    // Bishop
    { isWhite: false, position: [0, 2], type: PieceType.BISHOP },
    { isWhite: false, position: [0, 5], type: PieceType.BISHOP },
    // Queen
    { isWhite: false, position: [0, 3], type: PieceType.QUEEN },
    // King
    { isWhite: false, position: [0, 4], type: PieceType.KING, isMoved: false },
  ];
}

function initialWhites() {
  return [
    // Pawn
    ...initialPawnPieces(true),
    // Rook
    ...initialWhiteRooks(true),
    // Knight
    { isWhite: true, position: [7, 1], type: PieceType.KNIGHT },
    { isWhite: true, position: [7, 6], type: PieceType.KNIGHT },
    // Bishop
    { isWhite: true, position: [7, 2], type: PieceType.BISHOP },
    { isWhite: true, position: [7, 5], type: PieceType.BISHOP },
    // Queen
    { isWhite: true, position: [7, 3], type: PieceType.QUEEN },
    // King
    { isWhite: true, position: [7, 4], type: PieceType.KING, isMoved: false },
  ];
}

function initialRooks() {
  return [...initialWhiteRooks(true), ...initialBlackRooks(false)];
}

function initialWhiteRooks(isWhite, isMoved) {
  return [
    {
      isWhite,
      position: [7, 0],
      type: PieceType.ROOK,
      isMoved: isMoved || false,
    },
    {
      isWhite,
      position: [7, 7],
      type: PieceType.ROOK,
      isMoved: isMoved || false,
    },
  ];
}

function initialBlackRooks(isWhite, isMoved) {
  return [
    {
      isWhite,
      position: [0, 0],
      type: PieceType.ROOK,
      isMoved: isMoved || false,
    },
    {
      isWhite,
      position: [0, 7],
      type: PieceType.ROOK,
      isMoved: isMoved || false,
    },
  ];
}
