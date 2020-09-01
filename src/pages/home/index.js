import React from 'react';
import './index.scss';
const Menus = [
  { title: 'Board and Pieces', url: 'board-and-pieces' },
  { title: 'Move and Capture', url: 'move-and-capture' },
  { title: 'Principles', url: 'principles' },
  { title: 'Strategies ', url: 'strategies' },
];

const Home = () => {
  const handleClick = (url) => {
    window.location.href = url;
  };

  return Menus && Array.isArray(Menus) && Menus.length > 0 ? (
    <ul className="chess-menu clear-fix">
      {Menus.map((menu, index) => (
        <li
          className="chess-menu-item"
          key={`chess-menu-${index}`}
          onClick={() => handleClick(menu.url)}
        >
          {menu.title}
        </li>
      ))}
    </ul>
  ) : (
    ''
  );
};

export default Home;
