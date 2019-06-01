import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUsuario, getUsuario } from '../redux/usuarios.redux';
import { getImagensByFilters, loadImagem } from '../redux/imagens.redux';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { loadUsuario, usuarioId } = this.props;
    loadUsuario({ id: usuarioId });
  }

  componentDidUpdate(oldProps) {
    const { usuario, loadImagem } = this.props;
    const { imagem } = oldProps;

    if ((usuario && !imagem) || (usuario && imagem && usuario.imagemId != imagem._id)) {
      loadImagem({ id: usuario.imagemId });
    }
  }
  render() {
    const { imagem, usuario, style } = this.props;

    if (!usuario || !imagem) {
      return <div style={{ backgroundColor: 'gray', ...style }}>Loading...</div>;
    }

    return <img style={style} src={imagem.buffer} />;
  }
}

ProfilePicture.propTypes = {
  style: PropTypes.object,
  usuarioId: PropTypes.isRequired,
  usuario: PropTypes.object,
  imagem: PropTypes.object,
  loadImagem: PropTypes.func,
  loadUsuario: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      imagem: getImagensByFilters(state, { id: ownProps.id })[0],
      usuario: getUsuario(state, ownProps.usuarioId),
    };
  },
  { loadImagem, loadUsuario }
)(ProfilePicture);
