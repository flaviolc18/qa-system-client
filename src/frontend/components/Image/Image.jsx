import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getImagem, loadImagem, getImagemLoadingState } from '../../redux/imagens.redux';

import { base64Flag } from '../../../utils';

class Image extends Component {
  componentDidMount() {
    const { loadImagem, id } = this.props;
    id && loadImagem({ id });
  }

  componentDidUpdate(oldProps) {
    const { loadImagem, id } = this.props;
    const { imagem, imageLoadingState } = oldProps;

    if (imageLoadingState !== 'LOADING' && ((id && !imagem) || (imagem && id != imagem._id))) {
      loadImagem({ id });
    }
  }
  render() {
    const { imagem, style } = this.props;

    if (!imagem) {
      return <div style={{ backgroundColor: 'gray', ...style }} />;
    }

    const imageStr = Buffer.from(imagem.buffer).toString('base64');

    return <img style={style} src={base64Flag + imageStr} />;
  }
}

Image.propTypes = {
  style: PropTypes.object,
  id: PropTypes.string,
  imagem: PropTypes.object,
  imageLoadingState: PropTypes.string,
  loadImagem: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      imagem: getImagem(state, ownProps.id),
      imageLoadingState: getImagemLoadingState(state, { id: ownProps.id }),
    };
  },
  { loadImagem }
)(Image);
