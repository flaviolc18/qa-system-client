import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

class NavLink extends Component {
  render() {
    const { disabled, active, to, children } = this.props;

    return (
      <li className="navbar-item">
        <Link className={'navbar-link ' + (disabled ? 'disabled' : active ? 'active' : '')} to={to}>
          {children}
        </Link>
      </li>
    );
  }
}

NavLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  to: PropTypes.string,
};

export default NavLink;
