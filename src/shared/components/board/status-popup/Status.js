import React from 'react';

const Status = (props) => {
  const { isValidMoved, open, onTryAgain, onNext } = props;
  return (
    <div className={`chess-board-status ${open ? 'open' : ''}`}>
      {isValidMoved ? 'success' : 'failed'}
      {isValidMoved ? (
        <button onClick={onNext}>Next</button>
      ) : (
        <button onClick={onTryAgain}>Try again</button>
      )}
    </div>
  );
};

export default Status;
