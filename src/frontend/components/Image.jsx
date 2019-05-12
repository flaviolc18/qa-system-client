import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImagensByFilters, loadImagemNome } from '../redux/imagens.redux';

class Image extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.image) {
      this.props.loadImagemNome({ nome: this.props.name });
    }
  }
  render() {
    if (!this.props.image) {
      let style = this.props.style;
      style.backgroundColor = 'gray';
      return <div style={style} />;
    }
    return (
      <div>
        <img style={this.props.style} src={this.props.image.data} />
      </div>
    );
  }
}

Image.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string.isRequired,
  image: PropTypes.object,
  loadImagemNome: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      image: getImagensByFilters(state, { nome: ownProps.name }),
    };
  },
  { loadImagemNome }
)(Image);
