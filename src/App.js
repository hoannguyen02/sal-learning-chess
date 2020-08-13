import React from 'react';
import SALBoard from './sal-board';
import {
  generateBlocks,
  initialPlayer,
  setupPiecesForPlayers,
  getAvailablePositions,
  highLightBlocks,
} from './utils';
import { PlayerName } from './constants';

export default class App extends React.Component {
  state = {
    board: generateBlocks(),
    blackPlayer: initialPlayer(PlayerName.BLACK), // Another user or computer
    whitePlayer: initialPlayer(PlayerName.WHITE), // User
    currentBlock: null,
    isWhiteNext: true,
  };

  componentDidMount() {
    // Setup pieces for 2 players in board
    const { board, blackPlayer, whitePlayer } = this.state;
    const newBoard = setupPiecesForPlayers(board, [
      ...blackPlayer.pieces,
      ...whitePlayer.pieces,
    ]);
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
    }));
  }

  validateMove = () => {};

  checkGameOver = () => {};

  handleClick = (block) => {
    const {
      currentBlock,
      board,
      isWhiteNext,
      whitePlayer,
      blackPlayer,
    } = this.state;
    if (currentBlock && !isWhiteNext) {
      // Move or catch
    } else {
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
      }));
    }
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
