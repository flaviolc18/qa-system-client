import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUsuario, getUsuario, updateUsuario } from '../redux/usuarios.redux';
import { getSession } from '../redux/sessions.redux';
import { ProfilePicture } from '../components/Image';
import { UserQuestions } from '../components/Question';
import { FadeLoader } from 'react-spinners';

class Perfil extends Component {
  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId });
  }

  render() {
    if (!this.props.usuario) {
      return (
        <div style={{ margin: '100px 400px' }}>
          <FadeLoader sizeUnit={'px'} size={2} color={'#555555'} loading={true} />
        </div>
      );
    }
    const { usuario } = this.props;

    return (
      <div className="m-3">
        <div className="row p-0 m-2" style={{ width: '100%' }}>
          <div style={{ overflow: 'hidden' }} className="col-md-auto p-0 m-0 mr-2">
            <ProfilePicture
              style={{ width: '200px', borderRadius: '20px', height: '200px' }}
              usuarioId={this.props.usuarioId}
            />
          </div>

          <div className="col p-0 m-0">
            <h4 className="m-3">{usuario.username}</h4>
            <h6 className="m-3" style={{ color: 'gray' }}>
              {usuario.descricao}
            </h6>
          </div>
          <div className="col p-0 m-0" />
        </div>

        <UserQuestions usuarioId={this.props.usuarioId} />
      </div>
    );
  }
}

Perfil.propTypes = {
  usuarioId: PropTypes.string,
  loadUsuario: PropTypes.func,
  usuario: PropTypes.object,
  session: PropTypes.object,
  updateUsuario: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      usuario: getUsuario(state, ownProps.usuarioId),
      session: getSession(state),
    };
  },
  { loadUsuario, updateUsuario }
)(Perfil);
