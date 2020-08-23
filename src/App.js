import React from 'react';
import SALBoard from './sal-board';
import {
  generateBlocks,
  initialPlayer,
  setupPiecesForPlayers,
  getAvailablePositions,
  highLightBlocks,
  resetAvailablePositions,
  movePiece,
  changePieceStateAfterMoved,
  removePieceFromBlock,
  addPieceFromCurrentToNewBlock,
  isCastlingMove,
  castlingMovePiece,
} from './utils';
import { PlayerName } from './constants';

export default class App extends React.Component {
  state = {
    board: generateBlocks(),
    blackPlayer: initialPlayer(PlayerName.BLACK), // Another user or computer
    whitePlayer: initialPlayer(PlayerName.WHITE), // User
    currentBlock: null,
    isWhiteNext: true,
    availablePositions: null,
  };

  componentDidMount() {
    // Setup pieces for 2 players in board
    const { board, blackPlayer, whitePlayer, isWhiteNext } = this.state;
    const newBoard = setupPiecesForPlayers(
      board,
      [...blackPlayer.pieces, ...whitePlayer.pieces],
      isWhiteNext ? whitePlayer.playerName : blackPlayer.playerName
    );
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
    }));
  }

  checkGameOver = () => {};

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
        block.piece.playerName === currentBlock.piece.playerName
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
    const {
      board,
      availablePositions,
      isWhiteNext,
      whitePlayer,
      blackPlayer,
    } = this.state;
    let newBoard = resetAvailablePositions(board, availablePositions);
    const playerName = isWhiteNext
      ? whitePlayer.playerName
      : blackPlayer.playerName;
    const newPositions = getAvailablePositions({
      block,
      board,
      isWhiteNext,
      playerName,
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
    const {
      currentBlock,
      board,
      isWhiteNext,
      whitePlayer,
      blackPlayer,
      availablePositions,
    } = this.state;
    // Move piece
    let newBoard = castlingMovePiece(board, currentBlock, block);
    // Reset available positions, also current block
    newBoard = resetAvailablePositions(newBoard, [
      ...availablePositions,
      block.piece.position,
    ]);
    // Change pieces state after moved
    newBoard = changePieceStateAfterMoved(
      newBoard,
      !isWhiteNext ? whitePlayer.playerName : blackPlayer.playerName
    );
    // Update current block to null
    // Update isWhiteNext state
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentBlock: null,
      availablePositions: null,
      isWhiteNext: !prevState.isWhiteNext,
    }));
  };

  handleMovePiece = (block) => {
    const {
      currentBlock,
      board,
      isWhiteNext,
      whitePlayer,
      blackPlayer,
      availablePositions,
    } = this.state;
    // Move piece
    const playerName = !isWhiteNext
      ? whitePlayer.playerName
      : blackPlayer.playerName;
    let newBoard = movePiece(
      board,
      currentBlock,
      block,
      isWhiteNext,
      playerName
    );
    // Reset available positions, also current block
    newBoard = resetAvailablePositions(newBoard, [
      ...availablePositions,
      block.piece.position,
    ]);
    // Change pieces state after moved
    newBoard = changePieceStateAfterMoved(newBoard, playerName);
    // Update current block to null
    // Update isWhiteNext state
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentBlock: null,
      availablePositions: null,
      isWhiteNext: !prevState.isWhiteNext,
    }));
  };

  handleCatchPiece = (block) => {
    const {
      board,
      currentBlock,
      isWhiteNext,
      whitePlayer,
      blackPlayer,
    } = this.state;
    let newBoard = removePieceFromBlock(board, block);
    newBoard = addPieceFromCurrentToNewBlock(
      board,
      currentBlock,
      block,
      isWhiteNext
    );
    newBoard = removePieceFromBlock(board, currentBlock);
    // Change pieces state after moved
    newBoard = changePieceStateAfterMoved(
      newBoard,
      !isWhiteNext ? whitePlayer.playerName : blackPlayer.playerName
    );
    // Update current block to null
    // Update isWhiteNext state
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentBlock: null,
      availablePositions: null,
      isWhiteNext: !prevState.isWhiteNext,
    }));
  };

  handleGetNewPositions = (block) => {
    const { board, isWhiteNext, whitePlayer, blackPlayer } = this.state;
    /**
     * 1. Get available blocks to move and which ones can catch then Hight hight light those
     * 2. Set current block state in order to move or catch later on
     */
    const playerName = isWhiteNext
      ? whitePlayer.playerName
      : blackPlayer.playerName;
    const availablePositions = getAvailablePositions({
      block,
      board,
      isWhiteNext,
      playerName,
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
    const { board } = this.state;
    return (
      <>
        <SALBoard board={board} onClick={this.handleClick} />
      </>
    );
  }
}
