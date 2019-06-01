import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

class MenuButton extends Component {
  render() {
    return (
      <Link to={this.props.to} className={'menuLink ' + (this.props.pathname === this.props.to ? 'active' : '')}>
        {this.props.children}
      </Link>
    );
  }
}

MenuButton.propTypes = {
  pathname: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  to: PropTypes.string,
};

export default MenuButton;
