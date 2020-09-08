/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { MenuActions } from '../../shared/components';
import { PieceType } from '../../shared/constants';
import {
  updateBoard,
  initialBlacks,
  initialWhites,
  highLightBlocksWithType,
} from '../../shared/utils';
import { Board } from '../../shared/components';

const MENU_ACTIONS = [
  PieceType.PAWN,
  PieceType.KNIGHT,
  PieceType.KING,
  PieceType.BISHOP,
  PieceType.ROOK,
]
  .map((item) => ({ title: `The ${item}`, value: item }))
  .concat([{ title: 'BOARD', value: 'BOARD' }])
  .reverse();

const BoardAndPieces = () => {
  const [action, setAction] = useState(MENU_ACTIONS[0]);
  const [board, setBoard] = useState(null);

  const handleClick = (action) => {
    setAction(action);
  };

  useEffect(() => {
    const newBoard = updateBoard(
      [...initialBlacks(), ...initialWhites()],
      true,
      true,
      false
    );
    setBoard(newBoard);
  }, []);

  useEffect(() => {
    if (board && action.value) {
      const newBoard = highLightBlocksWithType(board, action.value);
      setBoard(newBoard);
    }
  }, [action]);

  return (
    <div className="board-and-pieces">
      <Board board={board} />
      <MenuActions
        actions={MENU_ACTIONS}
        onClick={handleClick}
        selectedAction={action}
      />
    </div>
  );
};

export default BoardAndPieces;
