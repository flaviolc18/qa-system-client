import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuHeader extends Component {
  render() {
    return (
      <div className="card-header">
        <div className="nav flex-column nav-pills p-0 m-0" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          {this.props.children}
        </div>
      </div>
    );
  }
}

MenuHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default MenuHeader;
