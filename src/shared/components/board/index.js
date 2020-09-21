/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Block from './block';
import './index.scss';
import PromotionPopup from './promotion-popup';
import VerticalCaption from './vertical-caption';
import HorizontalCaption from './horizontal-caption';
import { useBoard } from '../../hooks';
import UpdateModePopup from './update-mode-popup';
import StatusPopup from './status-popup';

const Board = (props) => {
  const {
    board: newBoard,
    updateMode,
    isValidateStatus,
    validateStatusInfo,
  } = props;
  const {
    boardState,
    handleClick,
    handlePromotionClick,
    handleUpdateBoard,
    handleActionModeClick,
    handleToggleUpdateMode,
    handleCloseUpdateModePopup,
    handleDeletePiece,
    handleAddPiece,
    validateStatus,
  } = useBoard({
    board: null,
    currentBlock: null,
    isWhiteNext: true,
    isWhite: true,
    availablePositions: null,
    promotionForPawn: {
      open: false,
      piece: null,
    },
    isWhitePlayOnly: props.isWhitePlayOnly,
    isCastlingMove: false,
    isUpdateModeOpened: false,
    updateModePopup: {
      open: false,
      isAdd: false,
      updateMode: null,
      block: null,
    },
    movesCount: 0,
    statusPopup: {
      validateStatusInfo: null,
      open: false,
      isValidMoved: false,
    },
  });

  useEffect(() => {
    newBoard && handleUpdateBoard(newBoard, isUpdateModeOpened);
  }, [newBoard]);

  useEffect(() => {
    if (isValidateStatus && boardState.movesCount) {
      validateStatus(validateStatusInfo);
    }
  }, [boardState.movesCount]);

  const {
    board,
    isWhiteNext,
    promotionForPawn,
    isUpdateModeOpened,
    updateModePopup,
    statusPopup,
  } = boardState;

  return board && Array.isArray(board) && board.length > 0 ? (
    <div className="board">
      <div className="clear-fix">
        <VerticalCaption />
        <HorizontalCaption />
        {board.map((block, index) => (
          <Block
            block={block}
            isUpdateModeOpened={isUpdateModeOpened}
            onClick={(block) => handleClick(block, boardState)}
            onActionModeClick={handleActionModeClick}
            whiteClass={
              (block.position[0] % 2 === 0 && block.position[1] % 2 !== 0) ||
              (block.position[0] % 2 !== 0 && block.position[1] % 2 === 0)
                ? 'white'
                : ''
            }
            key={`chess-block-${index}`}
            index={index}
          />
        ))}
      </div>
      {promotionForPawn && promotionForPawn.open && (
        <PromotionPopup
          piece={promotionForPawn.piece}
          open={promotionForPawn.open}
          onClick={(type) => handlePromotionClick(type, boardState)}
          isWhiteNext={isWhiteNext}
        />
      )}
      {updateMode && (
        <button className="update-mode" onClick={handleToggleUpdateMode}>
          Update Mode
        </button>
      )}
      {updateModePopup && updateModePopup.open && (
        <UpdateModePopup
          {...updateModePopup}
          onClose={handleCloseUpdateModePopup}
          onAdd={handleAddPiece}
          onDelete={handleDeletePiece}
          board={board}
        />
      )}
      {statusPopup && statusPopup.open && <StatusPopup {...statusPopup} />}
    </div>
  ) : (
    ''
  );
};

export default Board;
