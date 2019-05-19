import React, { Component } from 'react';
import { navigate } from '@reach/router';

import PropTypes from 'prop-types';
import Form from '../components/Form';
import { connect } from 'react-redux';
import { login, getSession } from '../redux/app.redux';

const loginBody = [
  { label: 'Email', defaultValue: '', class: 'input', type: 'email', placeHolder: 'example@mail.com' },
  { label: 'Senha', defaultValue: '', class: 'input', type: 'password', placeHolder: '******' },
];

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }
  signIn(e, state) {
    e.preventDefault();
    const body = {
      email: state.Email,
      password: state.Senha,
    };
    this.props.login(body).then(() => {
      if (this.props.session) navigate('/home');
    });
  }

  render() {
    return (
      <div className="row pt-5">
        <div className="col" />
        <div className="col">
          <Form body={loginBody} submit={this.signIn} submitLabel="Entrar!" />
        </div>
        <div className="col" />
      </div>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func,
  session: PropTypes.object,
};

export default connect(
  state => {
    return {
      session: getSession(state),
    };
  },
  { login }
)(SignIn);
