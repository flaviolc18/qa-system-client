import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, getSession } from '../../redux/sessions.redux';
import { BeatLoader } from 'react-spinners';

import Logo from '../Logo';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequesting: false,
      isWrong: false,
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
    this.setState({ isRequesting: true });
    const { isVisible, isRequesting, isWrong, ...loginBody } = this.state;
    this.props.login(loginBody, {}).then(response => {
      this.setState({ isRequesting: false });
      if (response.error) {
        this.setState({ isWrong: true });
      } else if (response && response.elements[0] && response.elements[0].usuarioId) {
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
        <form className="login-form bg-dark">
          <div>
            <form onSubmit={this.onLogin}>
              <div className="d-flex flex-column align-items-center">
                <Logo />
                <h3 className="modal-title mt-2" id="exampleModalLongTitle" style={{ color: 'white' }}>
                  Login
                </h3>
                {this.state.isWrong ? <div className="text-danger">Informações incorretas!</div> : ''}
              </div>
              <div className="mb-4" />

              <input
                name="email"
                className="input-text"
                type="email"
                style={{ width: '100%' }}
                placeHolder="Email"
                onChange={this.onChangeInput}
                value={this.state.email}
              />
              <div className="mb-4" />
              <input
                name="password"
                className="input-text"
                type="password"
                placeHolder="Password"
                style={{ width: '100%' }}
                onChange={this.onChangeInput}
                value={this.state.password}
              />
              <div className="mb-4" />

              <button
                type="submit"
                className="btn btn-block"
                style={{ borderRadius: '20px', backgroundColor: '#5e656d', color: 'white' }}
              >
                {this.state.isRequesting ? <BeatLoader sizeUnit={'px'} color="#FFFFFF" size="6" /> : 'Login'}
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
