import React from 'react';
import './index.scss';

const MenuActions = ({ actions, onClick, selectedAction }) => {
  return actions && Array.isArray(actions) && actions.length > 0 ? (
    <div className="menu-actions">
      {actions.map((action, index) => (
        <button
          key={`action-item-${index}`}
          className={`action-item ${
            action.value === selectedAction.value ? 'active' : ''
          }`}
          onClick={() => onClick(action)}
        >
          {action.title}
        </button>
      ))}
    </div>
  ) : (
    ''
  );
};

export default MenuActions;
