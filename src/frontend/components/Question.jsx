import React, { Component } from 'react';
import {
  loadPergunta,
  getPergunta,
  editPergunta,
  removePergunta,
  downvotePergunta,
  upvotePergunta,
} from '../redux/perguntas.redux';
import { getUsuariosByFilter, loadUsuarioPergunta } from '../redux/usuarios.redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from './Post';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  componentDidMount() {
    this.props.loadPergunta({ id: this.props.id });
    this.props.loadUsuarioPergunta({ perguntaId: this.props.id });
  }
  render() {
    if (!this.props.pergunta || !this.props.usuario) {
      return 'Loading...';
    }

    return (
      <Post
        redirect={true}
        path="/home"
        removePost={this.props.removePergunta}
        onFinishEditing={editedText => {
          this.props.editPergunta();
          this.setState({ isEditing: false });
        }}
        upVote={this.props.upvotePergunta}
        downVote={this.props.downvotePergunta}
        votes={{ upvotes: this.props.pergunta.upvotes, downvotes: this.props.pergunta.downvotes }}
        titulo={this.props.pergunta.titulo}
        post={this.props.pergunta}
        user={this.props.usuario}
        isEditing={this.state.isEditing}
        onEditClick={() => this.setState({ isEditing: true })}
      />
    );
  }
}

Question.propTypes = {
  upvotePergunta: PropTypes.func,
  downvotePergunta: PropTypes.func,
  editPergunta: PropTypes.func,
  removePergunta: PropTypes.func,
  loadPergunta: PropTypes.func,
  loadUsuarioPergunta: PropTypes.func,
  pergunta: PropTypes.object,
  usuario: PropTypes.object,
  id: PropTypes.string,
};

export default connect(
  (state, ownProps) => {
    return {
      pergunta: getPergunta(state, ownProps.id),
      usuario: getUsuariosByFilter(state, { perguntaId: ownProps.id })[0],
    };
  },
  { loadUsuarioPergunta, loadPergunta, editPergunta, removePergunta, downvotePergunta, upvotePergunta }
)(Question);
