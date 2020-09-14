import { PieceType } from '../constants/piece-type';

export {
  initialPawnPieces,
  initialBlacks,
  initialWhites,
  initialWhiteRooks,
  initialWhiteBishops,
  initialWhiteKnights,
  initialQueen,
  initialKing,
};
function initialPawnPieces(isWhite) {
  return [0, 1, 2, 3, 4, 5, 6, 7].map((item) => ({
    isWhite: isWhite,
    position: [isWhite ? 6 : 1, item],
    line: 1,
    canBeEnPassantCapture: false,
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
    ...initialBlackKnights(),
    // Bishop
    ...initialBlackBishops(),
    // Queen
    initialQueen(false),
    // King
    initialKing(false),
  ];
}

function initialWhites() {
  return [
    // Pawn
    ...initialPawnPieces(true),
    // Rook
    ...initialWhiteRooks(),
    // Knight
    ...initialWhiteKnights(),
    // Bishop
    ...initialWhiteBishops(),
    // Queen
    initialQueen(true),
    // King
    initialKing(true),
  ];
}

function initialKing(isWhite) {
  return { isWhite, position: [isWhite ? 7 : 0, 4], type: PieceType.KING };
}

function initialQueen(isWhite) {
  return { isWhite, position: [isWhite ? 7 : 0, 3], type: PieceType.QUEEN };
}

function initialWhiteKnights() {
  return [
    { isWhite: true, position: [7, 1], type: PieceType.KNIGHT },
    { isWhite: true, position: [7, 6], type: PieceType.KNIGHT },
  ];
}

function initialBlackKnights() {
  return [
    { isWhite: false, position: [0, 1], type: PieceType.KNIGHT },
    { isWhite: false, position: [0, 6], type: PieceType.KNIGHT },
  ];
}

function initialBlackBishops() {
  return [
    { isWhite: false, position: [0, 2], type: PieceType.BISHOP },
    { isWhite: false, position: [0, 5], type: PieceType.BISHOP },
  ];
}

function initialWhiteBishops() {
  return [
    { isWhite: true, position: [7, 2], type: PieceType.BISHOP },
    { isWhite: true, position: [7, 5], type: PieceType.BISHOP },
  ];
}

function initialWhiteRooks(isMoved) {
  return [
    {
      isWhite: true,
      position: [7, 0],
      type: PieceType.ROOK,
      isMoved: isMoved || false,
    },
    {
      isWhite: true,
      position: [7, 7],
      type: PieceType.ROOK,
      isMoved: isMoved || false,
    },
  ];
}

function initialBlackRooks(isMoved) {
  return [
    {
      isWhite: false,
      position: [0, 0],
      type: PieceType.ROOK,
      isMoved: isMoved || false,
    },
    {
      isWhite: false,
      position: [0, 7],
      type: PieceType.ROOK,
      isMoved: isMoved || false,
    },
  ];
}
