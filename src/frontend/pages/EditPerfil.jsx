import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { getUsuario, loadUsuario, updateUsuario, changeProfilePicture } from '../redux/usuarios.redux';
import { uploadImagem, loadImagem } from '../redux/imagens.redux';
import { navigate } from '@reach/router';

class EditPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      descricao: '',
      image: null,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.editUser = this.editUser.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.renderUpdateProfilePictureLabel = this.renderUpdateProfilePictureLabel.bind(this);
  }
  onTextChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId }).then(response => {
      if (response.total) {
        const usuario = response.elements[0];
        this.props.loadImagem({ id: usuario.imagemId }).then(response => {
          this.setState({
            username: usuario.username,
            descricao: usuario.descricao,
            imagem: response.elements[0],
          });
        });
      }
    });
  }

  onImageChange(e) {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append('image', image);
    this.setState({ image });

    // let reader = new FileReader();
    // reader.readAsDataURL(image);
    // reader.onload = e => {
    //   const image = {
    //     nome: image.name,
    //     buffer: e.target.result,
    //   };
    //   this.setState({ image });
    // };
  }

  editUser(e) {
    e.preventDefault();
    const { changeProfilePicture, updateUsuario, usuarioId } = this.props;
    let { image, username, descricao } = this.state;

    const promises = [];

    if (image) {
      promises.push(changeProfilePicture({ id: usuarioId }, image));
    }

    if (username || descricao) {
      promises.push(updateUsuario({ id: usuarioId }, { username, descricao }));
    }

    if (promises.length) {
      Promise.all(promises).then(() => navigate('/usuarios/' + usuarioId));
    }
  }

  render() {
    if (!this.props.usuario) {
      return '';
    }
    const imageBuffer = this.state.buffer;
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <h3>Editar Pefil</h3>
        <div className="mb-4">
          <label>Foto de Perfil</label>
          <div>
            {imageBuffer ? (
              <img style={{ width: '100px', height: '100px', backgroundColor: 'gray' }} src={imageBuffer} />
            ) : (
              ''
            )}
            <div htmlFor={'uploadInput'}>
              <label htmlFor={'uploadInput'} />
              <input className="form-control-file" type="file" id={'uploadInput'} onChange={this.onImageChange} />
            </div>
          </div>
        </div>
        <form onSubmit={this.editUser} className="form-container">
          <label>Nome de Usuario</label>
          <input
            name="username"
            className="form-control"
            onChange={this.onTextChange}
            type="text"
            value={this.state.username}
          />
          <label>Descrição</label>
          <input
            name="descricao"
            className="form-control"
            onChange={this.onTextChange}
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
EditPerfil.propTypes = {
  usuarioId: PropTypes.string,
  usuario: PropTypes.object,
  loadUsuario: PropTypes.func,
  changeProfilePicture: PropTypes.func,
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
  { loadUsuario, updateUsuario, uploadImagem, loadImagem, changeProfilePicture }
)(EditPerfil);
