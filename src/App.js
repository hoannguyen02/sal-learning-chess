import React from 'react';
import SALBoard from './sal-board';
import { generateBlocks, initialPlayer, setupPiecesForPlayers } from './utils';
import { PlayerName } from './constants';

export default class App extends React.Component {
  state = {
    board: generateBlocks(),
    blackPlayer: initialPlayer(PlayerName.BLACK), // Another user or computer
    whitePlayer: initialPlayer(PlayerName.WHITE), // User
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
  checkSkills = (block) => {
    alert(block.piece.type);
  };

  validateMove = () => {};

  checkGameOver = () => {};

  handleClick = (block) => {
    this.checkSkills(block);
    console.log('block', block);
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
