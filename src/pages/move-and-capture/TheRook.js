/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect } from 'react';
import { Board, MenuActions } from '../../shared/components';
import { PieceType } from '../../shared/constants';
import {
  updateBoard,
  initialPawnPieces,
  initialBlacks,
  initialWhites,
} from '../../shared/utils';

const RookType = {
  NO_BLOCK: 'NO_BLOCK',
  BLOCK_BY_WHITES: 'BLOCK_BY_WHITES',
  BLOCK_BY_BLACKS: 'BLOCK_BY_BLACKS',
  CASTLING: 'CASTLING',
  UPDATE_BOARD: 'UPDATE_BOARD',
};

const MENU_ACTIONS = [
  { title: 'Rook with empty board', value: RookType.NO_BLOCK },
  { title: 'Rook block by white pieces', value: RookType.BLOCK_BY_WHITES },
  { title: 'Rook block by black pieces', value: RookType.BLOCK_BY_BLACKS },
  { title: 'Castling', value: RookType.CASTLING },
];

const TheRook = () => {
  const [state, dispatch] = useReducer(theRookReducer, {
    currentMenu: MENU_ACTIONS[0],
    pieces: getDefaultWhites(),
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
    case RookType.NO_BLOCK:
      return { board: null, currentMenu, pieces: getDefaultWhites() };
    case RookType.BLOCK_BY_WHITES:
      return { board: null, pieces: initialWhites(), currentMenu };
    case RookType.BLOCK_BY_BLACKS:
      return {
        board: null,
        pieces: [...initialBlacks(), ...getDefaultWhites()],
        currentMenu,
      };
    case RookType.CASTLING:
      return {
        board: null,
        currentMenu,
        pieces: [
          ...initialPawnPieces(true),
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

function getDefaultWhites() {
  return [
    { isWhite: true, position: [7, 0], type: PieceType.ROOK, isMoved: false },
    { isWhite: true, position: [7, 7], type: PieceType.ROOK, isMoved: false },
  ];
}
