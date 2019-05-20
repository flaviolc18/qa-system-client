import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSession } from '../redux/sessions.redux';

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
    if (this.props.session) {
      this.props.onSubmit(this.state);
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <textarea
            disabled={this.props.session ? false : true}
            className="form-control"
            onChange={this.onChange}
            style={{ resize: 'none', width: '100%', height: '200px' }}
          />
          <div className="pb-3" />

          <button
            className={'btn btn-success ' + (this.props.session ? '' : 'disabled')}
            style={{ float: 'right' }}
            type="submit"
          >
            Postar!
          </button>
        </form>
      </div>
    );
  }
}

TextAreaBox.defaultProps = {
  buttonMessage: 'Postar!',
};

TextAreaBox.propTypes = {
  onSubmit: PropTypes.func,
  session: PropTypes.object,
  buttonMessage: PropTypes.string,
};

export default connect(state => {
  return {
    session: getSession(state),
  };
})(TextAreaBox);
