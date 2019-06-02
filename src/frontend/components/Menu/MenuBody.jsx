import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuBody extends Component {
  render() {
    return (
      <div className="card-body mt-3" style={{ borderLeft: '1px solid rgb(220,220,220)' }}>
        <div className="nav flex-column nav-pills p-0 m-0" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          {this.props.children}
        </div>
      </div>
    );
  }
}

MenuBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default MenuBody;
