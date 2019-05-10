import React, { Component } from 'react';

import Tabs from '../components/Tabs';
import { loadUsuario, getUsuario } from '../redux/usuarios.redux';
import PropTypes from 'prop-types';

import ProfilePicture from '../components/ProfilePicture';
import PerguntasUsuario from '../components/PerguntasUsuario';
import RespostasUsuario from '../components/RespostasUsuario';
import { connect } from 'react-redux';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelf: false,
      usuario: null,
    };
  }
  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId });
  }

  render() {
    if (!this.props.usuario) {
      return '';
    }
    const { usuario } = this.props;
    return (
      <div>
        <div className="row" style={{ width: '100%' }}>
          <div className="col">
            <ProfilePicture
              size={200}
              route={`/api/usuarios/${this.props.usuarioId}/upload`}
              src={usuario.profilePicture}
              style={{ marginLeft: 30 }}
            />
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
};

export default connect(
  (state, ownProps) => {
    return { usuario: getUsuario(state, ownProps.usuarioId) };
  },
  { loadUsuario }
)(Perfil);
