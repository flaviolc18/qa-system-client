import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUsuario, getUsuario, updateUsuario } from '../redux/usuarios.redux';
import { getSession } from '../redux/sessions.redux';
import ProfilePicture from '../components/ProfilePicture';
import PerguntasUsuario from '../components/PerguntasUsuario';
import RespostasUsuario from '../components/RespostasUsuario';
import Tabs from '../components/Tabs';
import { uploadImagem } from '../redux/imagens.redux';
import { Link } from '@reach/router';

class Perfil extends Component {
  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId });
  }

  renderEditButton() {
    if (this.props.session && this.props.session.usuarioId === this.props.usuarioId) {
      return <Link to={'/editar-perfil/' + this.props.usuarioId}>Editar</Link>;
    } else {
      return '';
    }
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
            <ProfilePicture
              style={{ width: '300px', borderRadius: '100%', height: '300px' }}
              usuarioId={this.props.usuarioId}
            />
          </div>

          <div style={{ paddingTop: '40px' }} className="col">
            <h4>{usuario.username}</h4>
            <h6>Reputação: {usuario.reputacao}</h6>
            <h6>Descrição: {usuario.descricao}</h6>
            {this.renderEditButton()}
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
