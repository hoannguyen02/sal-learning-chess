import React from 'react';
import Board from '../board';
import {
  generateBlocks,
  setupPiecesForPlayers,
  getAvailablePositions,
  highLightBlocks,
  resetAvailablePositions,
  movePiece,
  changePieceStateAfterMoved,
  removePieceFromBlock,
  isCastlingMove,
  castlingMovePiece,
} from '../..//utils';

import { PieceType } from '../../constants';

export default class App extends React.Component {
  state = {
    board: generateBlocks(),
    currentBlock: null,
    isWhiteNext: true,
    isWhite: true,
    availablePositions: null,
    promotionForPawn: {
      open: false,
      piece: null,
    },
  };

  componentDidMount() {
    const { whitePieces, blackPieces } = this.props;
    // Setup pieces for 2 players in board
    const { board, isWhite } = this.state;
    const newBoard = setupPiecesForPlayers(
      board,
      [...blackPieces, ...whitePieces],
      isWhite
    );
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
    }));
  }

  handleClick = (block) => {
    const { currentBlock } = this.state;

    if (!currentBlock) {
      this.handleGetNewPositions(block);
    } else {
      // Incase user click again in that block
      if (
        currentBlock.position[0] === block.position[0] &&
        currentBlock.position[1] === block.position[1]
      ) {
        return;
      }
      // Incase user click another blocks, meaning that not move or catch
      // We need to reset previous available positions and reset highlight
      // Then get new available position for that block
      else if (
        block.piece &&
        block.piece.isWhite === currentBlock.piece.isWhite
      ) {
        this.handleResetAndGetNewPositions(block);
      } else {
        // Move if there is no piece in block, otherwise catch
        if (!block.piece) {
          if (isCastlingMove(currentBlock, block)) {
            this.handleCastlingMove(block);
          } else {
            this.handleMovePiece(block);
          }
        } else {
          this.handleCatchPiece(block);
        }
      }
    }
  };

  handleResetAndGetNewPositions = (block) => {
    const { board, availablePositions, isWhiteNext, isWhite } = this.state;
    let newBoard = resetAvailablePositions(board, availablePositions);
    const newPositions = getAvailablePositions({
      block,
      board,
      isWhiteNext,
      isWhite,
    });
    newBoard = highLightBlocks(newBoard, newPositions);
    this.setState((prevState) => ({
      ...prevState,
      currentBlock: block,
      board: newBoard,
      availablePositions: newPositions,
    }));
  };

  handleCastlingMove = (block) => {
    const { currentBlock, board, availablePositions, isWhite } = this.state;
    // Move piece
    let newBoard = castlingMovePiece(board, currentBlock, block);
    // Reset available positions, also current block
    newBoard = resetAvailablePositions(newBoard, [
      ...availablePositions,
      block.piece.position,
    ]);
    // Change pieces state after moved
    newBoard = changePieceStateAfterMoved(newBoard, !isWhite);
    // Update current block to null
    // Update isWhiteNext state
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentBlock: null,
      availablePositions: null,
      isWhiteNext: !prevState.isWhiteNext,
      isWhite: !prevState.isWhite,
    }));
  };

  handleMovePiece = (block) => {
    const {
      currentBlock,
      board,
      isWhiteNext,
      availablePositions,
      isWhite,
    } = this.state;
    // Move piece
    let [piece, newBoard] = movePiece(
      board,
      currentBlock,
      block,
      isWhiteNext,
      !isWhiteNext,
      true
    );
    newBoard = removePieceFromBlock(board, currentBlock);
    // Reset available positions, also current block
    newBoard = resetAvailablePositions(newBoard, [
      ...availablePositions,
      block.piece.position,
    ]);
    // Change pieces state after moved
    newBoard = changePieceStateAfterMoved(newBoard, !isWhite);
    if (piece.type === PieceType.PAWN && piece.line === 8) {
      newBoard = this.handlePromotionForPawn(newBoard, piece);
    }
    // Update current block to null
    // Update isWhiteNext state
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentBlock: null,
      availablePositions: null,
      isWhiteNext: !prevState.isWhiteNext,
      isWhite: !prevState.isWhite,
    }));
  };

  handleCatchPiece = (block) => {
    const { board, currentBlock, isWhiteNext, isWhite } = this.state;
    let [piece, newBoard] = movePiece(
      board,
      currentBlock,
      block,
      isWhiteNext,
      !isWhiteNext,
      false
    );
    newBoard = removePieceFromBlock(board, currentBlock);
    // Change pieces state after moved
    newBoard = changePieceStateAfterMoved(newBoard, !isWhite);
    if (piece.type === PieceType.PAWN && piece.line === 8) {
      newBoard = this.handlePromotionForPawn(newBoard, piece);
    }
    // Update current block to null
    // Update isWhiteNext state
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentBlock: null,
      availablePositions: null,
      isWhiteNext: !prevState.isWhiteNext,
      isWhite: !prevState.isWhite,
    }));
  };

  handlePromotionForPawn = (board, piece) => {
    this.setState((prevState) => ({
      ...prevState,
      promotionForPawn: {
        piece,
        open: true,
      },
    }));
    return board;
  };

  handlePromotionClick = (type) => {
    const { promotionForPawn, board } = this.state;
    const newBoard = [...board];
    newBoard[promotionForPawn.piece.index].piece.type = type;
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
      promotionForPawn: {
        piece: null,
        open: false,
      },
    }));
  };

  handleGetNewPositions = (block) => {
    const { board, isWhiteNext, isWhite } = this.state;
    /**
     * 1. Get available blocks to move and which ones can catch then Hight hight light those
     * 2. Set current block state in order to move or catch later on
     */
    const availablePositions = getAvailablePositions({
      block,
      board,
      isWhiteNext,
      isWhite,
    });
    const newBoard = highLightBlocks(board, availablePositions);
    this.setState((prevState) => ({
      ...prevState,
      currentBlock: block,
      board: newBoard,
      availablePositions,
    }));
  };

  render() {
    const { board, promotionForPawn, isWhiteNext } = this.state;
    return (
      <>
        <Board
          board={board}
          promotion={promotionForPawn}
          isWhiteNext={isWhiteNext}
          onClick={this.handleClick}
          onPromotionClick={this.handlePromotionClick}
        />
      </>
    );
  }
}
