import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  render() {
    const { label, children } = this.props;
    let title;

    switch (typeof label) {
      case 'string':
      case 'object':
        title = label;
        break;
      case 'function':
        title = label();
        break;
    }
    return (
      <li style={{ listStyle: 'none', margin: '5px' }} className="nav-item dropdown">
        <a href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {title}
        </a>
        <div
          style={{ position: 'absolute' }}
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdown"
        >
          <ul style={{ padding: '0px', margin: '0px' }}>{children}</ul>
        </div>
      </li>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
};

export default Dropdown;
