import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { downvoteResposta, editResposta, removeResposta, upvoteResposta } from '../redux/respostas.redux';
import Post from './Post';

class Answer extends Component {
  render() {
    if (!this.props.user || !this.props.resposta) {
      return 'Loading...';
    }
    return (
      <Post
        removePost={this.props.removeResposta}
        editPost={this.props.editResposta}
        upVote={this.props.upvoteResposta}
        downVote={this.props.downvoteResposta}
        votes={{ upvotes: this.props.resposta.upvotes, downvotes: this.props.resposta.downvotes }}
        post={this.props.resposta}
        user={this.props.user}
      />
    );
  }
}

Answer.propTypes = {
  removeResposta: PropTypes.func,
  editResposta: PropTypes.func,
  upvoteResposta: PropTypes.func,
  downvoteResposta: PropTypes.func,
  resposta: PropTypes.object,
  user: PropTypes.object,
};

export default connect(
  () => ({}),
  { removeResposta, editResposta, upvoteResposta, downvoteResposta }
)(Answer);
