import React from 'react';
import { PieceType } from '../../constants';
import PromotionItem from './PromotionItem';
import './index.scss';

const Promotions = ({ onClick, piece }) => {
  return (
    <div className="sal-promotions sal-chess-clear-fix">
      {[PieceType.QUEEN, PieceType.KNIGHT, PieceType.BISHOP, PieceType.ROOK]
        .map((type) => ({
          ...piece,
          type,
        }))
        .map((promotion, index) => (
          <PromotionItem
            onClick={onClick}
            promotion={promotion}
            key={`sal-promotion-${index}`}
          />
        ))}
    </div>
  );
};

export default Promotions;
