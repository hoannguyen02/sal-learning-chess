/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect } from 'react';
import { Board, MenuActions } from '../../shared/components';
import { PieceType } from '../../shared/constants';
import {
  updateBoard,
  initialBlacks,
  initialWhiteRooks,
  initialWhiteBishops,
  initialQueen,
  initialKing,
  initialWhiteKnights,
  initialPawnPieces,
} from '../../shared/utils';

const MoveAndCaptureType = {
  THE_ROOK: 'ROOK',
  THE_BISHOP: 'BISHOP',
  THE_QUEEN: 'QUEEN',
  THE_KING: 'KING',
  THE_KNIGHT: 'KNIGHT',
  THE_PAWN: 'PAWN',
  UPDATE_BOARD: 'UPDATE_BOARD',
};

const MENU_ACTIONS = [
  PieceType.ROOK,
  PieceType.BISHOP,
  PieceType.QUEEN,
  PieceType.KING,
  PieceType.KNIGHT,
  PieceType.PAWN,
].map((item) => ({ title: `The ${item}`, value: item }));

const TheRook = () => {
  const [state, dispatch] = useReducer(theRookReducer, {
    currentMenu: MENU_ACTIONS[0],
    pieces: [...initialWhiteRooks(), ...initialBlacks()],
    board: null,
  });

  useEffect(() => {
    if (state.pieces) {
      const newBoard = updateBoard(state.pieces, true, true, true);
      dispatch({
        type: MoveAndCaptureType.UPDATE_BOARD,
        newBoard,
      });
    }
  }, [state.pieces]);

  const handleClick = (menu) => {
    switch (menu.value) {
      case MoveAndCaptureType.THE_BISHOP:
        dispatch({
          type: MoveAndCaptureType.THE_BISHOP,
          currentMenu: menu,
        });
        break;
      case MoveAndCaptureType.THE_QUEEN:
        dispatch({
          type: MoveAndCaptureType.THE_QUEEN,
          currentMenu: menu,
        });
        break;
      case MoveAndCaptureType.THE_KING:
        dispatch({
          type: MoveAndCaptureType.THE_KING,
          currentMenu: menu,
        });
        break;
      case MoveAndCaptureType.THE_KNIGHT:
        dispatch({
          type: MoveAndCaptureType.THE_KNIGHT,
          currentMenu: menu,
        });
        break;
      case MoveAndCaptureType.THE_PAWN:
        dispatch({
          type: MoveAndCaptureType.THE_PAWN,
          currentMenu: menu,
        });
        break;

      default:
        dispatch({
          type: MoveAndCaptureType.THE_ROOK,
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
    case MoveAndCaptureType.UPDATE_BOARD:
      return { ...state, board: newBoard };
    case MoveAndCaptureType.THE_ROOK:
      return {
        board: null,
        currentMenu,
        pieces: [...initialWhiteRooks(), ...initialBlacks()],
      };
    case MoveAndCaptureType.THE_BISHOP:
      return {
        board: null,
        currentMenu,
        pieces: [...initialWhiteBishops(), ...initialBlacks()],
      };
    case MoveAndCaptureType.THE_QUEEN:
      return {
        board: null,
        currentMenu,
        pieces: [initialQueen(true), ...initialBlacks()],
      };
    case MoveAndCaptureType.THE_KING:
      return {
        board: null,
        currentMenu,
        pieces: [initialKing(true), ...initialBlacks()],
      };
    case MoveAndCaptureType.THE_KNIGHT:
      return {
        board: null,
        currentMenu,
        pieces: [...initialWhiteKnights(), ...initialBlacks()],
      };
    case MoveAndCaptureType.THE_PAWN:
      return {
        board: null,
        currentMenu,
        pieces: [...initialPawnPieces(true), ...initialBlacks()],
      };

    default:
      return state;
  }
}
