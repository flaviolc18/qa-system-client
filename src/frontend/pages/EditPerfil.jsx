import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';

import { base64Flag } from '../../utils';

import { getUsuario, loadUsuario, updateUsuario, changeProfilePicture } from '../redux/usuarios.redux';
import { loadImagem } from '../redux/imagens.redux';

class EditPerfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      descricao: '',
      image: null,
      imageSource: null,
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.editUser = this.editUser.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  onTextChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId }).then(response => {
      const usuario = response.elements[0];
      this.props.loadImagem({ id: usuario.imagemId }).then(response => {
        const imagem = response.elements[0];

        const imageStr = Buffer.from(imagem.buffer).toString('base64');

        this.setState({
          username: usuario.username,
          descricao: usuario.descricao,
          imageSource: base64Flag + imageStr,
        });
      });
    });
  }

  onImageChange(e) {
    if (event.target.files && event.target.files[0]) {
      const image = e.target.files[0];

      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ image, imageSource: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  editUser(e) {
    e.preventDefault();
    const { changeProfilePicture, updateUsuario, usuarioId } = this.props;
    let { image, username, descricao } = this.state;

    const promises = [];

    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      promises.push(changeProfilePicture({ id: usuarioId }, formData));
    }

    if (username || descricao) {
      promises.push(updateUsuario({ id: usuarioId }, { username, descricao }));
    }

    if (promises.length) {
      Promise.all(promises).then(() => {
        navigate('/usuarios/' + usuarioId);
      });
    }
  }

  renderImage() {
    return this.state.imageSource ? (
      <img style={{ width: '100px', height: '100px', backgroundColor: 'gray' }} src={this.state.imageSource} />
    ) : (
      ''
    );
  }

  render() {
    if (!this.props.usuario) {
      return '';
    }
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <h3>Editar Pefil</h3>
        <div className="mb-4">
          <label>Foto de Perfil</label>
          <div>
            {this.renderImage()}
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
  { loadUsuario, updateUsuario, loadImagem, changeProfilePicture }
)(EditPerfil);
