import React, { useState } from 'react';
import { Game, MenuActions } from '../../components';
import { BLACK_PIECES, WHITE_PIECES, PieceType } from '../../constants';

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

  const handleClick = (action) => {
    setAction(action);
  };

  return (
    <div className="board-and-pieces">
      <Game
        blackPieces={BLACK_PIECES}
        whitePieces={WHITE_PIECES}
        disabledPieces
        pieceType={action.value}
      />
      <MenuActions
        actions={MENU_ACTIONS}
        onClick={handleClick}
        selectedAction={action}
      />
    </div>
  );
};

export default BoardAndPieces;
