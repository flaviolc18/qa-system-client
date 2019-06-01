import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getImagem, loadImagem } from '../redux/imagens.redux';

class Image extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { id, loadImagem } = this.props;
    loadImagem({ id });
  }

  componentDidUpdate(oldProps) {
    const { loadImagem, id } = this.props;
    const { imagem } = oldProps;

    if (imagem && id != imagem._id) {
      loadImagem({ id });
    }
  }
  render() {
    const { imagem, style } = this.props;

    if (!imagem) {
      //TODO: usar <Loading />
      return <div style={{ backgroundColor: 'gray', ...style }}>Loading...</div>;
    }

    return <img style={style} src={imagem.buffer} />;
  }
}

Image.propTypes = {
  style: PropTypes.object,
  id: PropTypes.string.isRequired,
  imagem: PropTypes.object,
  loadImagem: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      imagem: getImagem(state, ownProps.id),
    };
  },
  { loadImagem }
)(Image);
