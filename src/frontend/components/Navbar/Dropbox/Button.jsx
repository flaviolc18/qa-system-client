import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="dropbox-button">
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
