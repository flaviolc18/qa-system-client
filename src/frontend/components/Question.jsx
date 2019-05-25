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
      titulo: '',
    };

    this.onFinishEdit = this.onFinishEdit.bind(this);
  }

  componentDidMount() {
    this.props.loadPergunta({ id: this.props.id }).then(({ elements: [{ titulo }] }) => {
      this.setState(prevState => ({ ...prevState, titulo }));
    });
    this.props.loadUsuarioPergunta({ perguntaId: this.props.id });
  }

  renderTitulo() {
    return this.state.isEditing ? (
      <div>
        <div className="pb-2">
          <input
            className="form-control"
            name="titulo"
            onChange={e => {
              const titulo = e.target.value;
              this.setState(prevState => ({ ...prevState, titulo }));
            }}
            type="text"
            value={this.state.titulo}
          />
        </div>
      </div>
    ) : (
      <div>
        <h2>{this.props.pergunta.titulo}</h2>
        <hr className="colored-line" />
      </div>
    );
  }

  onFinishEdit(editedText) {
    this.props
      .editPergunta({ id: this.props.pergunta._id }, { titulo: this.state.titulo, descricao: editedText })
      .then(() => {
        this.setState({ isEditing: false });
      });
  }

  render() {
    if (!this.props.pergunta || !this.props.usuario) {
      return 'Loading...';
    }

    return (
      <div>
        {this.renderTitulo()}
        <Post
          onRemovePost={this.props.removePergunta}
          onFinishEdit={this.onFinishEdit}
          onUpvote={this.props.upvotePergunta}
          onDownvote={this.props.downvotePergunta}
          post={this.props.pergunta}
          user={this.props.usuario}
          isEditing={this.state.isEditing}
          onEditClick={() => this.setState({ isEditing: true })}
        />
      </div>
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
