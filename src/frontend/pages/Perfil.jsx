import React, { Component } from 'react';

import Tabs from '../components/Tabs';
import { http } from '../helpers/http';
import PropTypes from 'prop-types';

import ProfilePicture from '../components/ProfilePicture';
import PerguntasUsuario from '../components/PerguntasUsuario';
import RespostasUsuario from '../components/RespostasUsuario';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelf: false,
      usuario: {},
    };
  }
  componentDidMount() {
    http.get('/api/usuarios/' + this.props.usuarioId).then(usuario => this.setState({ usuario }));
  }

  render() {
    if (!this.state.usuario) {
      return '';
    }
    const { usuario } = this.state;
    return (
      <div className="p-3">
        <div className="row">
          <div className="col">
            <ProfilePicture
              size={200}
              route={`/api/usuarios/${this.props.usuarioId}/upload`}
              src={usuario.profilePicture}
            />
          </div>
          <div className="col pt-5">
            <h4>{usuario.username}</h4>
            <h6>Email: {usuario.email}</h6>
            <h6>Reputação: {usuario.reputacao}</h6>
          </div>
        </div>
        <div className="pt-5">
          <Tabs
            tabs={[
              { label: 'Perguntas', component: <PerguntasUsuario usuarioId={this.props.usuarioId} /> },
              { label: 'Respostas', component: <RespostasUsuario usuarioId={this.props.usuarioId} /> },
            ]}
          />
        </div>
      </div>
    );
  }
}

Perfil.propTypes = {
  usuarioId: PropTypes.string,
};

export default Perfil;
