import React from 'react';
import SALBoard from './sal-board';
import { generateBlocks, initialPlayer, updateBoard } from './utils';
import { PlayerName } from './constants';

export default class App extends React.Component {
  state = {
    board: generateBlocks(),
    blackPlayer: initialPlayer(PlayerName.BLACK), // Another user or computer
    whilePlayer: initialPlayer(PlayerName.WHITE), // User
  };

  componentDidMount() {
    this.updateBoard();
  }

  updateBoard = () => {
    const { board, blackPlayer, whilePlayer } = this.state;
    const newBoard = updateBoard(board, [
      ...blackPlayer.pieces,
      ...whilePlayer.pieces,
    ]);
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
    }));
  };

  checkSkills = () => {};

  validateMove = () => {};

  checkGameOver = () => {};

  handleClick = (block) => {
    console.log(block);
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
