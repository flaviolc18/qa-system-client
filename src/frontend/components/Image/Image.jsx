import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getImagem, loadImagem } from '../../redux/imagens.redux';
import { BounceLoader } from 'react-spinners';
import { base64Flag } from '../../../utils';

class Image extends Component {
  componentDidMount() {
    this.props.loadImagem({ id: this.props.id });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.imagem === this.props.imagem) return;
    const { loadImagem, id } = this.props;
    const { imagem } = oldProps;

    if (imagem === this.props.imagem) return;
    if (id === oldProps.id) return;

    if ((id && !imagem) || (imagem && id != imagem._id)) {
      loadImagem({ id });
    }
  }
  render() {
    const { imagem, style } = this.props;
    if (!imagem) {
      return (
        <div style={{ backgroundColor: 'gray', ...style, overflow: 'hidden' }}>
          <BounceLoader sizeUnit={'px'} color="#FFFFFF" size={style.width.split('px')[0]} />
        </div>
      );
    }

    const imageStr = Buffer.from(imagem.buffer).toString('base64');

    return <img style={style} src={base64Flag + imageStr} />;
  }
}

Image.propTypes = {
  style: PropTypes.object,
  id: PropTypes.string,
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
