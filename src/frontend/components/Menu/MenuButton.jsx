import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuButton extends Component {
  render() {
    return (
      <button className="btn-success" style={{ ...this.props.style }} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

MenuButton.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default MenuButton;
