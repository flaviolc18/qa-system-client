import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feed extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-md-center p-0 m-0" style={{ minWidth: '1200px' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
Feed.propTypes = {
  children: PropTypes.object,
};

export default Feed;
