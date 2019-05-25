import React from 'react';
import PropTypes from 'prop-types';

function ActionButton({ onClick, icon, text, visible, color }) {
  return (
    visible && (
      <button onClick={onClick} style={{ color, border: '0', backgroundColor: 'rgba(1,1,1,0)' }}>
        {icon && <i className={`fas ${icon}`} />}
        {text && <div>{text}</div>}
      </button>
    )
  );
}

ActionButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  text: PropTypes.string,
  visible: PropTypes.bool,
  color: PropTypes.string,
};

export default ActionButton;
