import React, { useState } from 'react';
import { GameForLearning, MenuActions } from '../../components';
import {
  PieceType,
  WHITE_PIECES,
  BLACK_PIECES,
  INITIAL_WHITE_PAWNS,
} from '../../constants';

const RookType = {
  NO_BLOCK: 'NO_BLOCK',
  BLOCK_BY_WHITES: 'BLOCK_BY_WHITES',
  BLOCK_BY_BLACKS: 'BLOCK_BY_BLACKS',
  CASTLING: 'CASTLING',
};

const MENU_ACTIONS = [
  { title: 'Rook with empty board', value: RookType.NO_BLOCK },
  { title: 'Rook block by white pieces', value: RookType.BLOCK_BY_WHITES },
  { title: 'Rook block by black pieces', value: RookType.BLOCK_BY_BLACKS },
  { title: 'Castling', value: RookType.CASTLING },
];

const TheRook = () => {
  const [action, setAction] = useState(MENU_ACTIONS[0]);
  const [whitePieces, setWhitePieces] = useState([
    { isWhite: true, position: [7, 0], type: PieceType.ROOK, isMoved: false },
    { isWhite: true, position: [7, 7], type: PieceType.ROOK, isMoved: false },
  ]);
  const [blackPieces, setBlackPieces] = useState([]);

  const handleClick = (action) => {
    setAction(action);
    switch (action.value) {
      case RookType.BLOCK_BY_WHITES:
        setWhitePieces(WHITE_PIECES);
        setBlackPieces([]);
        break;
      case RookType.BLOCK_BY_BLACKS:
        setWhitePieces([
          {
            isWhite: true,
            position: [7, 0],
            type: PieceType.ROOK,
            isMoved: false,
          },
          {
            isWhite: true,
            position: [7, 7],
            type: PieceType.ROOK,
            isMoved: false,
          },
        ]);
        setBlackPieces(BLACK_PIECES);
        break;

      case RookType.CASTLING:
        setWhitePieces([
          ...INITIAL_WHITE_PAWNS,
          {
            isWhite: true,
            position: [7, 0],
            type: PieceType.ROOK,
            isMoved: false,
          },
          {
            isWhite: true,
            position: [7, 7],
            type: PieceType.ROOK,
            isMoved: false,
          },
          {
            isWhite: true,
            position: [7, 4],
            type: PieceType.KING,
            isMoved: false,
          },
        ]);
        setBlackPieces([]);
        break;

      default:
        setWhitePieces([
          {
            isWhite: true,
            position: [7, 0],
            type: PieceType.ROOK,
            isMoved: false,
          },
          {
            isWhite: true,
            position: [7, 7],
            type: PieceType.ROOK,
            isMoved: false,
          },
        ]);
        setBlackPieces([]);
        break;
    }
  };

  return (
    <div className="board-and-pieces">
      <GameForLearning
        pieces={[...blackPieces, ...whitePieces]}
        isWhitePlayOnly
      />
      <MenuActions
        actions={MENU_ACTIONS}
        onClick={handleClick}
        selectedAction={action}
      />
    </div>
  );
};

export default TheRook;
