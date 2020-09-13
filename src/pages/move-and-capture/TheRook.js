/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect } from 'react';
import { Board, MenuActions } from '../../shared/components';
import { PieceType } from '../../shared/constants';
import {
  updateBoard,
  initialPawnPieces,
  initialBlacks,
  initialWhites,
  initialRooks,
  initialWhiteRooks,
} from '../../shared/utils';

const RookType = {
  ROOK_ONLY: 'ROOK_ONLY',
  FULL_PIECES: 'FULL_PIECES',
  CASTLING: 'CASTLING',
  UPDATE_BOARD: 'UPDATE_BOARD',
};

const MENU_ACTIONS = [
  { title: 'Rook Only', value: RookType.ROOK_ONLY },
  { title: 'Full Pieces', value: RookType.FULL_PIECES },
  { title: 'Castling', value: RookType.CASTLING },
];

const TheRook = () => {
  const [state, dispatch] = useReducer(theRookReducer, {
    currentMenu: MENU_ACTIONS[0],
    pieces: initialRooks(),
    board: null,
  });

  useEffect(() => {
    if (state.pieces) {
      const newBoard = updateBoard(state.pieces, true, true, true);
      dispatch({
        type: RookType.UPDATE_BOARD,
        newBoard,
      });
    }
  }, [state.pieces]);

  const handleClick = (menu) => {
    switch (menu.value) {
      case RookType.FULL_PIECES:
        dispatch({
          type: RookType.FULL_PIECES,
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
          type: RookType.ROOK_ONLY,
          currentMenu: menu,
        });
        break;
    }
  };

  const { board, currentMenu } = state;
  return (
    <div className="board-and-pieces">
      <Board board={board} isWhitePlayOnly updateMode />
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
  const { type, currentMenu, newBoard } = action;
  switch (type) {
    case RookType.UPDATE_BOARD:
      return { ...state, board: newBoard };
    case RookType.ROOK_ONLY:
      return { board: null, currentMenu, pieces: initialRooks() };
    case RookType.FULL_PIECES:
      return {
        board: null,
        pieces: [...initialWhites(), ...initialBlacks()],
        currentMenu,
      };
    case RookType.CASTLING:
      return {
        board: null,
        currentMenu,
        pieces: [
          ...initialPawnPieces(true),
          ...initialWhiteRooks(true),
          {
            isWhite: true,
            position: [7, 4],
            type: PieceType.KING,
            isMoved: false,
          },
          ...initialBlacks(),
        ],
      };

    default:
      return state;
  }
}
