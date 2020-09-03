import React from 'react';
import './index.scss';
const Menus = [
  { title: 'The Rook', url: 'move-and-capture/rook' },
  { title: 'The Bishop', url: 'move-and-capture/bishop' },
  { title: 'The Queen', url: 'move-and-capture/queen' },
  { title: 'The King ', url: 'move-and-capture/king' },
  { title: 'The Knight ', url: 'move-and-capture/knight' },
  { title: 'The Pawn ', url: 'move-and-capture/pawn' },
];

const MoveAndCapture = () => {
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

export default MoveAndCapture;
