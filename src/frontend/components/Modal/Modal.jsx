import React from 'react';
import PropTypes from 'prop-types';

function Modal({ title, bodyText, modalId, cancelText, confirmText, onCancel, onConfirm }) {
  return (
    <div
      className={`modal fade`}
      id={modalId}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modal-label">
              {title}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{bodyText}</div>
          <div className="modal-footer">
            <button onClick={onCancel} className="btn btn-secondary" data-dismiss="modal">
              {cancelText}
            </button>
            <button id={`button-${modalId}`} onClick={onConfirm} className="btn btn-primary" data-dismiss="modal">
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  bodyText: '',
  confirmText: 'Ok',
  cancelText: 'Cancel',
  onConfirm: () => {},
  onCancel: () => {},
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  modalId: PropTypes.string.isRequired,
  bodyText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Modal;
