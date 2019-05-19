import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUsuario, getUsuario, updateUsuario } from '../redux/usuarios.redux';
import { getSession } from '../redux/app.redux';
import ProfilePicture from '../components/ProfilePicture';
import PerguntasUsuario from '../components/PerguntasUsuario';
import RespostasUsuario from '../components/RespostasUsuario';
import Tabs from '../components/Tabs';
import { uploadImagem } from '../redux/imagens.redux';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOverProfilePicture: false,
    };
    this.upload = this.upload.bind(this);
  }
  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId });
  }

  upload(e) {
    if (!(this.props.session && this.props.usuarioId === this.props.session.usuarioId)) {
      return '';
    }

    const image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      const buffer = e.target.result;
      const body = {
        nome: image.name,
        buffer,
      };
      this.props.uploadImagem(body).then(response => {
        this.props.updateUsuario({ id: this.props.usuarioId }, { fotoPerfil: response.elements[0]._id });
      });
    };
  }

  renderUpdateProfilePictureLabel() {
    if (
      !(
        this.props.session &&
        this.props.usuarioId === this.props.session.usuarioId &&
        this.state.isMouseOverProfilePicture
      )
    ) {
      return '';
    }
    return (
      <div
        htmlFor={'uploadInput'}
        className="ui icon button"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'absolute',
          width: '300px',
          borderRadius: '100%',
          height: '300px',
          top: '0px',
          opacity: '50%',
          color: 'black',
        }}
      >
        <label htmlFor={'uploadInput'} className="ui icon button">
          <div style={{ margin: '150px 120px', color: 'white' }}>Atualizar Foto</div>
        </label>
        <input type="file" id={'uploadInput'} style={{ display: 'none' }} onChange={this.upload} />
      </div>
    );
  }
  render() {
    if (!this.props.usuario) {
      return '';
    }
    const { usuario } = this.props;
    return (
      <div>
        <div className="row" style={{ width: '100%' }}>
          <div style={{ overflow: 'hidden' }} className="col">
            <span
              onMouseLeave={() => this.setState({ isMouseOverProfilePicture: false })}
              onMouseEnter={() => this.setState({ isMouseOverProfilePicture: true })}
            >
              <ProfilePicture
                style={{ width: '300px', borderRadius: '100%', height: '300px' }}
                usuarioId={this.props.usuarioId}
              />
              {this.renderUpdateProfilePictureLabel()}
            </span>
          </div>

          <div style={{ paddingTop: '40px' }} className="col">
            <h4>{usuario.username}</h4>
            <h6>Email: {usuario.email}</h6>
            <h6>Reputação: {usuario.reputacao}</h6>
          </div>
        </div>

        <div className="pt-3" />
        <Tabs
          tabs={[
            { label: 'Perguntas', component: <PerguntasUsuario usuarioId={this.props.usuarioId} /> },
            { label: 'Respostas', component: <RespostasUsuario usuarioId={this.props.usuarioId} /> },
          ]}
        />
      </div>
    );
  }
}

Perfil.propTypes = {
  usuarioId: PropTypes.string,
  loadUsuario: PropTypes.func,
  usuario: PropTypes.object,
  session: PropTypes.object,
  uploadImagem: PropTypes.func,
  updateUsuario: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      usuario: getUsuario(state, ownProps.usuarioId),
      session: getSession(state),
    };
  },
  { loadUsuario, uploadImagem, updateUsuario }
)(Perfil);
