import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
  render() {
    return (
      <div className="col m-0 p-0">
        <div className={this.props.bordered ? 'card' : ''}>{this.props.children}</div>
      </div>
    );
  }
}

Menu.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Menu;
