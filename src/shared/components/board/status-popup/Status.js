import React from 'react';

const Status = (props) => {
  const { isValidMoved, open } = props;
  return (
    <div className={`chess-board-status ${open ? 'open' : ''}`}>
      {isValidMoved ? 'success' : 'failed'}
      {isValidMoved ? <button>Next</button> : <button>Try again</button>}
    </div>
  );
};

export default Status;
