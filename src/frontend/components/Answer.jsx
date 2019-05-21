import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { downvoteResposta, editResposta, removeResposta, upvoteResposta } from '../redux/respostas.redux';
import Post from './Post';
/*
            removePost={this.props.removePergunta}
            editPost={this.props.editPergunta}
            upVote={this.props.upvotePergunta}
            downVote={this.props.downvotePergunta}
            titulo={this.props.pergunta.titulo}
*/

class Answer extends Component {
  render() {
    if (!this.props.user || !this.props.resposta) {
      return 'Loading...';
    }
    return (
      <div className="row p-3">
        <div className="p-3" style={{ width: '100%', borderRadius: '5px', backgroundColor: 'rgb(245,245,245)' }}>
          <Post
            removePost={this.props.removeResposta}
            editPost={this.props.editResposta}
            upVote={this.props.upvoteResposta}
            downVote={this.props.downvoteResposta}
            votes={{ upvotes: this.props.resposta.upvotes, downvotes: this.props.resposta.downvotes }}
            post={this.props.resposta}
            user={this.props.user}
          />
        </div>
      </div>
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
  () => {},
  { removeResposta, editResposta, upvoteResposta, downvoteResposta }
)(Answer);
