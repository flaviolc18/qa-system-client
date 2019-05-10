import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

class Answer extends Component {
  render() {
    if (!this.props.user || !this.props.resposta) {
      return '';
    }
    return (
      <div className="row p-3">
        <div className="p-3" style={{ width: '100%', borderRadius: '5px', backgroundColor: 'rgb(245,245,245)' }}>
          <Post post={this.props.resposta} user={this.props.user} />
        </div>
      </div>
    );
  }
}

Answer.propTypes = {
  resposta: PropTypes.object,
  user: PropTypes.object,
};

export default Answer;
