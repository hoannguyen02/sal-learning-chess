import React from 'react';
import Home from './pages/home';
import BoardAndPieces from './pages/board-and-pieces';
import MoveAndCapture from './pages/move-and-capture';
import Principles from './pages/principles';
import Strategies from './pages/strategies';
import TheRook from './pages/move-and-capture/TheRook';
import TheBishop from './pages/move-and-capture/TheBishop';
import TheQueen from './pages/move-and-capture/TheQueen';
import TheKing from './pages/move-and-capture/TheKing';
import TheKnight from './pages/move-and-capture/TheKnight';
import ThePawn from './pages/move-and-capture/ThePawn';

const App = () => {
  const { pathname } = window.location;
  let page;
  switch (pathname) {
    case '/':
      page = <Home />;
      break;
    case '/board-and-pieces':
      page = <BoardAndPieces />;
      break;
    case '/move-and-capture':
      page = <MoveAndCapture />;
      break;
    case '/principles':
      page = <Principles />;
      break;
    case '/strategies':
      page = <Strategies />;
      break;
    case '/move-and-capture/rook':
      page = <TheRook />;
      break;
    case '/move-and-capture/bishop':
      page = <TheBishop />;
      break;
    case '/move-and-capture/queen':
      page = <TheQueen />;
      break;
    case '/move-and-capture/king':
      page = <TheKing />;
      break;
    case '/move-and-capture/knight':
      page = <TheKnight />;
      break;
    case '/move-and-capture/pawn':
      page = <ThePawn />;
      break;

    default:
      page = 'Wrong url';
      break;
  }

  return <div className="container">{page}</div>;
};

export default App;
