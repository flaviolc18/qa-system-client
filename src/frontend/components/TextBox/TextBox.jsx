import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSession } from '../../redux/sessions.redux';

class TextAreaBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    e.preventDefault();

    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div>
        <textarea
          ref={this.props.reference}
          className="text-box"
          disabled={this.props.session ? false : true}
          onChange={this.onChange}
          placeHolder={this.props.placeHolder}
          style={{ resize: 'none', width: '100%', height: '200px' }}
        />
        <div className="pb-3" />
      </div>
    );
  }
}

TextAreaBox.propTypes = {
  reference: PropTypes.object,
  placeHolder: PropTypes.string,
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
