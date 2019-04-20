import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feed extends Component {
  render() {
    return <div className="feed">{this.props.children}</div>;
  }
}
Feed.propTypes = {
  children: PropTypes.object,
};

export default Feed;
