import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadResposta, editResposta, removeResposta } from '../redux/respostas.redux';
import { loadUsuariosByResposta, getUsuariosByFilter } from '../redux/usuarios.redux';

import Post from './Post';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };

    this.onFinishEdit = this.onFinishEdit.bind(this);
  }

  componentDidMount() {
    this.props.loadUsuariosByResposta({ respostaId: this.props.resposta._id });
  }

  onFinishEdit(editedText) {
    this.props.editResposta({ id: this.props.resposta._id }, { descricao: editedText }).then(() => {
      this.setState({ isEditing: false });
    });
  }

  render() {
    //FIXME: isso não é loading
    if (!this.props.resposta || !this.props.usuario) {
      return 'Loading...';
    }
    return (
      <Post
        onRemovePost={this.props.removeResposta}
        onFinishEdit={this.onFinishEdit}
        loadPost={this.props.loadResposta}
        post={this.props.resposta}
        user={this.props.usuario}
        isEditing={this.state.isEditing}
        onEditClick={() => this.setState({ isEditing: true })}
      />
    );
  }
}

Answer.propTypes = {
  loadResposta: PropTypes.func,
  removeResposta: PropTypes.func,
  editResposta: PropTypes.func,
  resposta: PropTypes.object,
  usuario: PropTypes.object,
  loadUsuariosByResposta: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      usuario: getUsuariosByFilter(state, { respostaId: ownProps.resposta._id })[0],
    };
  },
  { loadResposta, removeResposta, editResposta, loadUsuariosByResposta }
)(Answer);
