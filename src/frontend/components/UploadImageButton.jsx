import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImagem } from '../redux/imagens.redux';
import PropTypes from 'prop-types';

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
  }
  upload(e) {
    const image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      const buffer = e.target.result;
      const body = {
        nome: image.name,
        buffer,
      };
      this.props.uploadImagem(body);
    };
  }

  render() {
    return (
      <span>
        <label htmlFor={'uploadInput'} className="ui icon button">
          <i className="fas fa-upload fa-2x" />
        </label>
        <input type="file" id={'uploadInput'} style={{ display: 'none' }} onChange={this.upload} />
      </span>
    );
  }
}

UploadButton.propTypes = {
  uploadImagem: PropTypes.func,
};

export default connect(
  () => {
    return {};
  },
  { uploadImagem }
)(UploadButton);
