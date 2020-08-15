import React from 'react';
import SALBoard from './sal-board';
import {
  generateBlocks,
  initialPlayer,
  setupPiecesForPlayers,
  getAvailablePositions,
  highLightBlocks,
  resetAvailablePositions,
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

  validateMove = () => {};

  checkGameOver = () => {};

  handleClick = (block) => {
    const { currentBlock } = this.state;

    if (!currentBlock) {
      this.handleGetNewAvailablePositions(block);
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
        this.handleResetAvailablePositions();
        this.handleGetNewAvailablePositions(block);
      } else {
        // Move or catch
      }
    }
  };

  handleResetAvailablePositions = () => {
    const { board, availablePositions } = this.state;
    const resetBoard = resetAvailablePositions(board, availablePositions);
    this.setState((prevState) => ({
      ...prevState,
      board: resetBoard,
      availablePositions: null,
    }));
  };

  handleGetNewAvailablePositions = (block) => {
    const { board, isWhiteNext, whitePlayer, blackPlayer } = this.state;
    /**
     * 1. Get available blocks to move and which ones can catch then Hight hight light those
     * 2. Set current block state in order to move or catch later on
     */
    const availablePositions = getAvailablePositions({
      block,
      board,
      isWhiteNext,
      player: isWhiteNext ? whitePlayer : blackPlayer,
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
