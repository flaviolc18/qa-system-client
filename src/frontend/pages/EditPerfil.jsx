import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { getUsuario, loadUsuario, updateUsuario } from '../redux/usuarios.redux';
import { uploadImagem, loadImagem } from '../redux/imagens.redux';
import { navigate } from '@reach/router';

class EditPerfilt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      descricao: '',
      buffer: null,
    };
    this.onChange = this.onChange.bind(this);
    this.editUser = this.editUser.bind(this);
    this.upload = this.upload.bind(this);
    this.renderUpdateProfilePictureLabel = this.renderUpdateProfilePictureLabel.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId }).then(response => {
      const usuario = response.elements[0];
      this.props.loadImagem({ id: usuario.fotoPerfil }).then(response => {
        this.setState({
          username: usuario.username,
          descricao: usuario.descricao,
          buffer: response.elements[0].buffer,
        });
      });
    });
  }

  upload(e) {
    const image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      const buffer = e.target.result;
      const body = {
        nome: image.name,
        buffer,
      };
      this.setState({ image: body, buffer });
    };
  }

  editUser(e) {
    e.preventDefault();
    let { image, buffer, ...data } = this.state;

    if (image) {
      this.props.uploadImagem(this.state.image).then(response => {
        if (response.elements[0]) {
          this.props.updateUsuario({ id: this.props.usuarioId }, { fotoPerfil: response.elements[0]._id });
        }
      });
    }

    this.props.updateUsuario({ id: this.props.usuarioId }, data).then(() => {
      navigate('/usuarios/' + this.props.usuarioId);
    });
  }

  renderUpdateProfilePictureLabel() {
    return (
      <div htmlFor={'uploadInput'}>
        <label htmlFor={'uploadInput'} />
        <input className="form-control-file" type="file" id={'uploadInput'} onChange={this.upload} />
      </div>
    );
  }

  render() {
    if (!this.props.usuario) {
      return '';
    }
    const imafgeBuffer = this.state.buffer;
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <h3>Editar Pefil</h3>
        <div className="mb-4">
          <label>Foto de Perfil</label>
          <div>
            {imafgeBuffer ? (
              <img style={{ width: '100px', height: '100px', backgroundColor: 'gray' }} src={imafgeBuffer} />
            ) : (
              ''
            )}

            {this.renderUpdateProfilePictureLabel()}
          </div>
        </div>
        <form onSubmit={this.editUser} className="form-container">
          <label>Nome de Usuario</label>
          <input
            name="username"
            className="form-control"
            onChange={this.onChange}
            type="text"
            value={this.state.username}
          />
          <label>Descrição</label>
          <input
            name="descricao"
            className="form-control"
            onChange={this.onChange}
            type="text"
            value={this.state.descricao}
          />
          <div className="row p-0 m-0 pt-3">
            <button className="btn btn-success" type="submit">
              {' '}
              Atualiar
            </button>
            <Link className="ml-4" to={'/mudar-senha/' + this.props.usuarioId}>
              Alterar Senha
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
EditPerfilt.propTypes = {
  usuarioId: PropTypes.string,
  usuario: PropTypes.object,
  loadUsuario: PropTypes.func,
  updateUsuario: PropTypes.func,
  uploadImagem: PropTypes.func,
  loadImagem: PropTypes.func,
};
export default connect(
  (state, ownProps) => {
    return {
      usuario: getUsuario(state, ownProps.usuarioId),
    };
  },
  { loadUsuario, updateUsuario, uploadImagem, loadImagem }
)(EditPerfilt);
