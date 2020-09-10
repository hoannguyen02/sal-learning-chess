import Modal from '../../modal';
import React from 'react';

const UpdateModePopup = ({ updateMode, isAdd, open, onClose }) => {
  return isAdd ? (
    <Modal open={open} onClose={onClose}>
      Add
    </Modal>
  ) : (
    <Modal open={open} onClose={onClose}>
      Delete
    </Modal>
  );
};

export default UpdateModePopup;
