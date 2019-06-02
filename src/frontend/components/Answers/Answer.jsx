import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadResposta, editResposta, removeResposta, getRespostaById } from '../../redux/respostas.redux';
import { getUsuariosByFilter, loadUsuario } from '../../redux/usuarios.redux';

import { Post } from '../Post';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };

    this.onFinishEdit = this.onFinishEdit.bind(this);
  }

  componentDidMount() {
    this.props.loadResposta({ id: this.props.resposta._id });
    this.props.loadUsuario({ id: this.props.resposta.usuarioId });
  }

  onFinishEdit(editedText) {
    this.props.editResposta({ id: this.props.resposta._id }, { descricao: editedText }).then(() => {
      this.setState({ isEditing: false });
    });
  }

  render() {
    if (!this.props.resposta || !this.props.usuario) {
      return (
        <div>
          <div className="row p-0 m-0">
            <div className="col-md-auto p-0 m-3">
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: 'rgb(240,240,240)',
                  borderRadiur: '10px',
                  margin: '10px',
                }}
              />
            </div>
            <div className="col p-0 m-0">
              <div
                style={{
                  width: '100%',
                  height: '150px',
                  backgroundColor: 'rgb(240,240,240)',
                  borderRadiur: '10px',
                  margin: '10px',
                }}
              />
            </div>
          </div>
        </div>
      );
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
  loadUsuario: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      resposta: getRespostaById(state, ownProps.resposta._id),
      usuario: getUsuariosByFilter(state, { id: ownProps.resposta.usuarioId })[0],
    };
  },
  { loadResposta, loadUsuario, removeResposta, editResposta }
)(Answer);
