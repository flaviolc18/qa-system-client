import React, { Component } from 'react';

import Tabs from '../components/Tabs';
import { loadUsuario, getUsuario } from '../redux/usuarios.redux';
import PropTypes from 'prop-types';

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
      <div className="p-3">
        <div className="row">
          <div className="col">
            <div style={{ backgroundColor: 'gray', borderRadius: '100%', height: '200px', width: '200px' }} />
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
  loadUsuario: PropTypes.func,
  usuario: PropTypes.object,
};

export default connect(
  (state, ownProps) => {
    return { usuario: getUsuario(state, ownProps.usuarioId) };
  },
  { loadUsuario }
)(Perfil);
