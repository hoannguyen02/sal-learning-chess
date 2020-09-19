import React from 'react';
import Home from './pages/home';
import BoardAndPieces from './pages/board-and-pieces';
import MoveAndCapture from './pages/move-and-capture';
import Principles from './pages/principles';
import Strategies from './pages/strategies';
import Practices from './pages/practices';

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
    case '/practices':
      page = <Practices />;
      break;

    default:
      page = 'Wrong url';
      break;
  }

  return <div className="container">{page}</div>;
};

export default App;
