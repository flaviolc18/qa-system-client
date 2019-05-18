import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImagensByFilters, loadImagemNome, loadImagem } from '../redux/imagens.redux';

class Image extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.image) {
      this.props.loadImagem({ id: this.props.id });
    }
  }

  componentDidUpdate() {
    if (!this.props.image) {
      this.props.loadImagem({ id: this.props.id });
    }
  }
  render() {
    if (!this.props.image) {
      let style = this.props.style;
      return <div style={{ backgroundColor: 'gray', ...style }} />;
    }
    return (
      <div>
        <img style={this.props.style} src={this.props.image.buffer} />
      </div>
    );
  }
}

Image.propTypes = {
  style: PropTypes.object,
  id: PropTypes.string.isRequired,
  image: PropTypes.object,
  loadImagemNome: PropTypes.func,
  loadImagem: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      image: getImagensByFilters(state, { id: ownProps.id })[0],
    };
  },
  { loadImagemNome, loadImagem }
)(Image);
