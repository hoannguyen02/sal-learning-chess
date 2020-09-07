import React, { useReducer } from 'react';
import { MenuActions } from '../../components';
import Board from '../../components/board';
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

const DEFAULT_ROOKS = [
  { isWhite: true, position: [7, 0], type: PieceType.ROOK, isMoved: false },
  { isWhite: true, position: [7, 7], type: PieceType.ROOK, isMoved: false },
];

const TheRook = () => {
  const [state, dispatch] = useReducer(theRookReducer, {
    currentMenu: MENU_ACTIONS[0],
    pieces: DEFAULT_ROOKS,
  });

  const handleClick = (menu) => {
    switch (menu.value) {
      case RookType.BLOCK_BY_WHITES:
        dispatch({
          type: RookType.BLOCK_BY_WHITES,
          currentMenu: menu,
        });
        break;
      case RookType.BLOCK_BY_BLACKS:
        dispatch({
          type: RookType.BLOCK_BY_BLACKS,
          currentMenu: menu,
        });
        break;
      case RookType.CASTLING:
        dispatch({
          type: RookType.CASTLING,
          currentMenu: menu,
        });
        break;

      default:
        dispatch({
          type: RookType.NO_BLOCK,
          currentMenu: menu,
        });
        break;
    }
  };

  const { pieces, currentMenu } = state;
  return (
    <div className="board-and-pieces">
      <Board pieces={pieces} isWhitePlayOnly />
      <MenuActions
        actions={MENU_ACTIONS}
        onClick={handleClick}
        selectedAction={currentMenu}
      />
    </div>
  );
};

export default TheRook;

// Reducer
function theRookReducer(state, action) {
  const { type, currentMenu } = action;
  switch (type) {
    case RookType.NO_BLOCK:
      return {
        currentMenu,
        pieces: DEFAULT_ROOKS,
      };
    case RookType.BLOCK_BY_WHITES:
      return {
        pieces: WHITE_PIECES,
        currentMenu,
      };
    case RookType.BLOCK_BY_BLACKS:
      return {
        pieces: [...BLACK_PIECES, ...DEFAULT_ROOKS],
        currentMenu,
      };
    case RookType.CASTLING:
      return {
        currentMenu,
        pieces: [
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
        ],
      };

    default:
      return state;
  }
}
