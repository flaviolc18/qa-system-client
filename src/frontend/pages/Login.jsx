import React, { Component } from 'react';
import Form from '../components/Form';
import { http } from '../helpers/http';
import { navigate } from '@reach/router';

const loginBody = [
  { label: 'Email', defaultValue: '', class: 'input', type: 'email', placeHolder: 'example@mail.com' },
  { label: 'Senha', defaultValue: '', class: 'input', type: 'password', placeHolder: '******' },
];

class Login extends Component {
  login(e, state) {
    e.preventDefault();
    const body = {
      email: state.Email,
      password: state.Senha,
    };
    http.post('/api/usuarios/login', body).then(() => navigate('/home'));
  }

  render() {
    return (
      <div className="row pt-5">
        <div className="col" />
        <div className="col">
          <Form body={loginBody} submit={this.login} submitLabel="Entrar!" />
        </div>
        <div className="col" />
      </div>
    );
  }
}

export default Login;
