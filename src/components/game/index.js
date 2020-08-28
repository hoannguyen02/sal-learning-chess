import React from 'react';
import Board from '../board';
import {
  setupBoard,
  handleCatchOther,
  isCastlingMove,
  handleNormalMove,
  handleGetNewPositions,
  handleResetAndGetNewPositions,
  handleCastlingMove,
} from '../..//utils';

export default class App extends React.Component {
  state = {
    board: null,
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
    const { isWhite } = this.state;
    const newBoard = setupBoard(blackPieces, whitePieces, isWhite);
    this.setState((prevState) => ({
      ...prevState,
      board: newBoard,
    }));
  }

  handleClick = (block) => {
    const { currentBlock } = this.state;

    if (!currentBlock) {
      /**
       * 1. Get available blocks to move and which ones can catch then Hight hight light those
       * 2. Set current block state in order to move or catch later on
       */
      const newState = handleGetNewPositions({ ...this.state, block });
      this.setState((prevState) => ({
        ...prevState,
        ...newState,
        currentBlock: block,
      }));
      return;
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
      if (block.piece && block.piece.isWhite === currentBlock.piece.isWhite) {
        const newState = handleResetAndGetNewPositions({
          ...this.state,
          block,
        });
        this.setState((prevState) => ({
          ...prevState,
          ...newState,
          currentBlock: block,
        }));
      } else {
        // Move if there is no piece in block, otherwise catch
        if (!block.piece) {
          if (isCastlingMove(currentBlock, block)) {
            const newState = handleCastlingMove({
              ...this.state,
              block,
              availablePositions: [
                ...this.state.availablePositions,
                currentBlock.piece.position,
              ],
            });
            this.setState((prevState) => ({
              ...prevState,
              ...newState,
              currentBlock: null,
              availablePositions: null,
              isWhiteNext: !prevState.isWhiteNext,
              isWhite: !prevState.isWhite,
            }));
          } else {
            const newState = handleNormalMove({ ...this.state, block });
            this.setState((prevState) => ({
              ...prevState,
              ...newState,
              currentBlock: null,
              availablePositions: null,
              isWhiteNext: !prevState.isWhiteNext,
              isWhite: !prevState.isWhite,
            }));
          }
        } else {
          const newState = handleCatchOther({
            ...this.state,
            block,
            isMoved: false,
          });
          this.setState((prevState) => ({
            ...prevState,
            ...newState,
            currentBlock: null,
            availablePositions: null,
            isWhiteNext: !prevState.isWhiteNext,
            isWhite: !prevState.isWhite,
          }));
        }
      }
    }
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

  render() {
    const { board, promotionForPawn, isWhiteNext } = this.state;
    return (
      <Board
        board={board}
        promotion={promotionForPawn}
        isWhiteNext={isWhiteNext}
        onClick={this.handleClick}
        onPromotionClick={this.handlePromotionClick}
      />
    );
  }
}
