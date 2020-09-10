import Modal from '../../modal';
import React from 'react';

const UpdateModePopup = (props) => {
  const {
    updateMode,
    isAdd,
    open,
    onClose,
    block,
    onAdd,
    onDelete,
    disabled,
  } = props;
  return isAdd ? (
    <Modal open={open} onClose={onClose} disabled={disabled}>
      Add
    </Modal>
  ) : (
    <Modal open={open} onClose={onClose} disabled={disabled}>
      Are you sure you want to delete the {block.piece.type} at {block.caption}?
      <button onClick={!disabled && onDelete}>ok</button>
    </Modal>
  );
};

export default UpdateModePopup;
