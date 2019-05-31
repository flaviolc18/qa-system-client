import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, getSession } from '../../redux/sessions.redux';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.backgrounRef = React.createRef();
    this.onBackgroundClick = this.onBackgroundClick.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    const { isVisible, ...loginBody } = this.state;
    this.props.login(loginBody, {}).then(response => {
      if (response.elements[0] && response.elements[0].usuarioId) {
        this.props.onLogin();
      }
    });
  }
  onChangeInput(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onBackgroundClick(e) {
    if (e.target === this.backgrounRef.current) {
      this.props.onBackgroundClick();
    }
  }

  render() {
    if (!this.props.isVisible) {
      return '';
    }
    return (
      <div ref={this.backgrounRef} onMouseDown={this.onBackgroundClick} className="login-modal">
        <form className="login-form">
          <div>
            <form onSubmit={this.onLogin}>
              <h5 className="modal-title" id="exampleModalLongTitle">
                Login
              </h5>
              <div className="mb-4" />

              <input
                name="email"
                className="form-control"
                type="email"
                style={{ width: '100%' }}
                placeHolder="Email"
                onChange={this.onChangeInput}
                value={this.state.email}
              />
              <div className="mb-4" />
              <input
                name="password"
                className="form-control"
                type="password"
                placeHolder="Password"
                style={{ width: '100%' }}
                onChange={this.onChangeInput}
                value={this.state.password}
              />
              <div className="mb-4" />

              <button type="submit" className="btn btn-block btn-primary">
                Login
              </button>
            </form>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func,
  session: PropTypes.object,
  onBackgroundClick: PropTypes.func,
  onLogin: PropTypes.func,
  isVisible: PropTypes.bool,
};

export default connect(
  state => {
    return {
      session: getSession(state),
    };
  },
  { login }
)(LoginForm);
