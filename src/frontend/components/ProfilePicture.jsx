import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUsuario, getUsuario } from '../redux/usuarios.redux';

import Image from './Image';

class ProfilePicture extends Component {
  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId });
  }

  render() {
    const { usuario, style } = this.props;

    if (!usuario) {
      //TODO: usar <Loading />
      return <div style={{ backgroundColor: 'gray', ...style }}>Loading...</div>;
    }
    return <Image style={style} id={usuario.imagemId} />;
  }
}

ProfilePicture.propTypes = {
  style: PropTypes.object,
  usuario: PropTypes.object,
  usuarioId: PropTypes.string,
  loadUsuario: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return { usuario: getUsuario(state, ownProps.usuarioId) };
  },
  { loadUsuario }
)(ProfilePicture);
