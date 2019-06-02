import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSession } from '../../redux/sessions.redux';

class TextAreaBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.initialValue,
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
          value={this.state.text}
          onChange={this.onChange}
          placeholder={this.props.placeHolder}
          style={{ resize: 'none', width: '100%', height: '200px' }}
        />
        <div className="pb-3" />
      </div>
    );
  }
}
TextAreaBox.defaultProps = {
  initialValue: '',
};
TextAreaBox.propTypes = {
  initialValue: PropTypes.string,
  reference: PropTypes.object,
  placeHolder: PropTypes.string,
  session: PropTypes.object,
};

export default connect(state => {
  return {
    session: getSession(state),
  };
})(TextAreaBox);
