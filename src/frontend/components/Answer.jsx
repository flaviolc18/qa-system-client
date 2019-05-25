import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { downvoteResposta, editResposta, removeResposta, upvoteResposta } from '../redux/respostas.redux';
import Post from './Post';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  onFinishEdit(editedText) {
    this.props.editResposta({ id: this.props.resposta._id }, { descricao: editedText }).then(() => {
      this.setState({ isEditing: false });
    });
  }

  render() {
    if (!this.props.user || !this.props.resposta) {
      return 'Loading...';
    }
    return (
      <Post
        onRemovePost={this.props.removeResposta}
        onFinishEdit={this.onFinishEdit}
        onUpvote={this.props.upvoteResposta}
        onDownvote={this.props.downvoteResposta}
        post={this.props.resposta}
        user={this.props.user}
        isEditing={this.state.isEditing}
        onEditClick={() => this.setState({ isEditing: true })}
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
