import React, { useState, useEffect } from 'react';
import { PieceType } from '../../../../constants';
import PromotionItem from './PromotionItem';
import './index.scss';

const Promotions = ({ onClick, piece, isWhiteNext, open }) => {
  const { position } = piece;
  const [promotionStyles, setPromotionStyles] = useState({});

  let isWhite =
    (position[0] % 2 === 0 && position[1] % 2 !== 0) ||
    (position[0] % 2 !== 0 && position[1] % 2 === 0);

  useEffect(() => {
    !isWhiteNext
      ? setPromotionStyles({ top: 0, bottom: 'auto' })
      : setPromotionStyles({ bottom: 0, top: 'auto' });
  }, [isWhiteNext]);

  return (
    <div
      className={`chess-promotions clear-fix ${open ? 'open' : ''}`}
      style={{ left: `${position[1] * 12.5}%`, ...promotionStyles }}
    >
      {[PieceType.QUEEN, PieceType.KNIGHT, PieceType.BISHOP, PieceType.ROOK]
        .map((type) => {
          const newPiece = {
            ...piece,
            type,
            isWhite: isWhite,
          };
          isWhite = !isWhite;
          return newPiece;
        })
        .map((promotion, index) => (
          <PromotionItem
            onClick={onClick}
            promotion={promotion}
            key={`chess-promotion-${index}`}
          />
        ))}
    </div>
  );
};

export default Promotions;
