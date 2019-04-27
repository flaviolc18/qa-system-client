import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextAreaBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <textarea
            className="form-control"
            onChange={this.onChange}
            style={{ resize: 'none', width: '100%', height: '200px' }}
          />
          <div className="pb-3" />
          <button className="btn btn-success" style={{ float: 'right' }} type="submit">
            Postar!
          </button>
        </form>
      </div>
    );
  }
}

TextAreaBox.propTypes = {
  onSubmit: PropTypes.func,
};

export default TextAreaBox;
