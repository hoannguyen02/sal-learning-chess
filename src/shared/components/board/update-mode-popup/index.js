import Modal from '../../modal';
import Dropdown from '../../dropdown';
import { PieceType } from '../../../constants';
import React, { useCallback, useState, useMemo } from 'react';

const PlayerType = {
  WHITE: 'WHITE',
  BLACK: 'BLACK',
};

const UpdateModePopup = (props) => {
  const options = useMemo(() => {
    return [
      PieceType.ROOK,
      PieceType.BISHOP,
      PieceType.QUEEN,
      PieceType.KING,
      PieceType.KNIGHT,
      PieceType.PAWN,
    ];
  }, []);

  const players = useMemo(() => {
    return [PlayerType.WHITE, PlayerType.BLACK];
  }, []);

  const [currentPieceType, setCurrentPieceType] = useState(options[0]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);

  const handleSelectPieceType = useCallback((type) => {
    setCurrentPieceType(type);
  }, []);

  const handleSelectPlayer = useCallback((player) => {
    setCurrentPlayer(player);
  }, []);

  const { isAdd, open, onClose, block, onAdd, onDelete, disabled } = props;
  return isAdd ? (
    <Modal open={open} onClose={onClose} disabled={disabled}>
      <Dropdown
        options={players}
        label="Please select player"
        onChange={handleSelectPlayer}
      />
      <Dropdown
        options={options}
        label="Please select piece type"
        onChange={handleSelectPieceType}
      />
      <button
        onClick={() =>
          !disabled &&
          onAdd(currentPieceType, currentPlayer === PlayerType.WHITE)
        }
      >
        ok
      </button>
      <button onClick={!disabled && onClose}>cancel</button>
    </Modal>
  ) : (
    <Modal open={open} onClose={onClose} disabled={disabled}>
      Are you sure you want to delete the {block.piece.type} at {block.caption}?
      <button onClick={!disabled && onDelete}>ok</button>
    </Modal>
  );
};

export default UpdateModePopup;
