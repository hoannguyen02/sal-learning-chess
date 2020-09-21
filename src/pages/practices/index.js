import React, { useReducer, useEffect } from 'react';
import { Board, MenuActions } from '../../shared/components';
import { updateBoard } from '../../shared/utils';
import { FAKE_DATA } from './fake-data';

const PracticesType = {
  UPDATE_BOARD: 'UPDATE_BOARD',
  BINDING_DATA: 'BINDING_DATA',
};

const Practices = () => {
  const [state, dispatch] = useReducer(practicesReducer, {
    currentMenu: null,
    pieces: null,
    board: null,
    data: null,
    menuItems: null,
    validateStatusInfo: null,
  });

  // Fetching data
  useEffect(() => {
    dispatch({
      type: PracticesType.BINDING_DATA,
      data: FAKE_DATA,
    });
  }, []);

  useEffect(() => {
    if (state.pieces) {
      const newBoard = updateBoard(state.pieces, true, true, true);
      dispatch({
        type: PracticesType.UPDATE_BOARD,
        newBoard,
      });
    }
  }, [state.pieces]);

  const handleClick = (menu) => {
    switch (menu.value) {
      case PracticesType[menu.value]:
        dispatch({
          type: PracticesType[menu.value],
          currentMenu: menu,
        });
        break;
      default:
        break;
    }
  };

  const { board, currentMenu, menuItems, validateStatusInfo } = state;
  return (
    <div className="board-and-pieces">
      <Board
        board={board}
        isWhitePlayOnly
        updateMode
        isValidateStatus
        validateStatusInfo={validateStatusInfo}
      />
      <MenuActions
        actions={menuItems}
        onClick={handleClick}
        selectedAction={currentMenu}
      />
    </div>
  );
};

export default Practices;

function practicesReducer(state, action) {
  const { type, newBoard } = action;
  switch (type) {
    case PracticesType.BINDING_DATA: {
      const { data } = action;
      const menuItems = Object.keys(data).map((key) => {
        PracticesType[key] = key;
        return data[key].item;
      });
      const initialCurrentMenu = menuItems[0];
      return {
        data,
        menuItems,
        currentMenu: initialCurrentMenu,
        board: null,
        pieces: data[initialCurrentMenu.value].pieces,
        validateStatusInfo: {
          limitMoves: data[initialCurrentMenu.value].limitMoves,
          nextBlocks: data[initialCurrentMenu.value].nextBlocks,
        },
      };
    }
    case PracticesType.UPDATE_BOARD:
      return { ...state, board: newBoard };
    case PracticesType[type]:
      const { currentMenu } = action;
      return {
        board: null,
        currentMenu,
        menuItems: state.menuItems,
        data: state.data,
        pieces: state.data[currentMenu.value].pieces,
        validateStatusInfo: {
          limitMoves: state.data[currentMenu.value].limitMoves,
          nextBlocks: state.data[currentMenu.value].nextBlocks,
        },
      };

    default:
      return {
        currentMenu: null,
        pieces: null,
        board: null,
        data: null,
        menuItems: null,
        validateStatusInfo: null,
      };
  }
}
