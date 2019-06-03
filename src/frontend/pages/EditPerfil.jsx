import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import { FadeLoader, BeatLoader } from 'react-spinners';

import { base64Flag } from '../../utils';
import { getSession } from '../redux/sessions.redux';

import { getUsuario, loadUsuario, updateUsuario, removeUsuario, changeProfilePicture } from '../redux/usuarios.redux';
import { loadImagem } from '../redux/imagens.redux';

import Modal from '../components/Modal/Modal';

class EditPerfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      descricao: '',
      image: null,
      imageSource: null,
      isUpdating: false,
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.editUser = this.editUser.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onTextChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (!this.props.session || !this.props.session.usuarioId) {
      navigate('/');
    }
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
  componentDidUpdate() {
    if (!this.props.session || !this.props.session.usuarioId) {
      navigate('/');
    }
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
    this.setState({ isUpdating: true });
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
        this.setState({ isUpdating: false });
        navigate('/usuarios/' + usuarioId);
      });
    }
  }

  onDeleteClick() {
    const { removeUsuario, usuario } = this.props;

    removeUsuario({ id: usuario._id }).then(() => navigate('/'));
  }

  renderImage() {
    return this.state.imageSource ? (
      <img
        style={{ width: '100px', height: '100px', backgroundColor: 'gray', borderRadius: '20px' }}
        src={this.state.imageSource}
      />
    ) : (
      ''
    );
  }

  render() {
    if (!this.props.usuario) {
      return (
        <div style={{ margin: '100px 400px' }}>
          <FadeLoader sizeUnit={'px'} size={2} color={'#555555'} loading={true} />
        </div>
      );
    }
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Modal
          title={'Deseja deletar sua conta?'}
          modalId={`remove-usuario-modal`}
          bodyText={'A deleção não pode ser desfeita.'}
          onConfirm={this.onDeleteClick}
        />
        <div className="mb-3" />
        <h3>Editar Pefil</h3>
        <div className="row m-0 p-0 mt-2">
          <div className="mt-4" />

          <Link className="" to={'/mudar-senha/' + this.props.usuarioId}>
            <i className="fas fa-key" /> Alterar Senha
          </Link>
        </div>
        <form onSubmit={this.editUser}>
          <div className="mb-3" />
          <h4 style={{ color: 'gray' }}>Username:</h4>
          <input
            name="username"
            className="input-text"
            onChange={this.onTextChange}
            placeholder="Username"
            type="text"
            value={this.state.username}
          />
          <div className="mb-3" />
          <h4 style={{ color: 'gray' }}>Descrição:</h4>
          <input
            name="descricao"
            className="input-text"
            placeholder="Descrição"
            onChange={this.onTextChange}
            type="text"
            value={this.state.descricao}
          />
          <div className="mb-3" />
          <h4 style={{ color: 'gray' }}>Foto de Perfil:</h4>

          <div style={{ backgroundColor: 'rgb(240,240,240)', borderRadius: '20px', padding: '10px' }} className="mb-4">
            <div>
              {this.renderImage()}
              <div htmlFor={'uploadInput'}>
                <label htmlFor={'uploadInput'} />
                <input
                  className="form-control-file"
                  type="file"
                  id={'uploadInput'}
                  style={{ border: 'none' }}
                  onChange={this.onImageChange}
                />
              </div>
            </div>
          </div>
          <div className="row align-items-center p-0 m-0 pt-3">
            <div className="col-md-auto p-0 m-0">
              <button className="btn btn-primary" style={{ borderRadius: '20px', width: '170px' }} type="submit">
                {this.state.isUpdating ? (
                  <BeatLoader sizeUnit={'px'} color="#FFFFFF" size="6" />
                ) : (
                  <div>
                    <i className="fas fa-upload mr-1" /> Atualiar
                  </div>
                )}
              </button>
            </div>
            <div className="col p-0 m-0" />
            <div className="col-md-auto p-0 m-0 link text-danger">
              <button
                className="btn btn-danger"
                style={{
                  borderRadius: '20px',
                  width: '170px',
                }}
                onClick={e => e.preventDefault()}
                data-toggle="modal"
                data-target="#remove-usuario-modal"
              >
                <i className="fas fa-user-times mr-1" /> Deletar Conta
              </button>
            </div>
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
  removeUsuario: PropTypes.func,
  uploadImagem: PropTypes.func,
  loadImagem: PropTypes.func,
  session: PropTypes.object,
};
export default connect(
  (state, ownProps) => {
    return {
      usuario: getUsuario(state, ownProps.usuarioId),
      session: getSession(state),
    };
  },
  { loadUsuario, updateUsuario, loadImagem, removeUsuario, changeProfilePicture }
)(EditPerfil);
