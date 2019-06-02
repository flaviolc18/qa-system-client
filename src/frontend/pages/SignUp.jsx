import React, { Component } from 'react';
import { navigate } from '@reach/router';

import { signUpUsuario } from '../redux/usuarios.redux.js';
import { login } from '../redux/sessions.redux.js';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      descricao: '',
      confirmPassword: '',
    };
    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  signUp(e) {
    e.preventDefault();
    if (this.state.password != this.state.confirmPassword) {
      alert('As senhas não são iguais!');
      return;
    }

    this.props.signUpUsuario(this.state).then(response => {
      if (!response.error) {
        const usuario = response.elements[0];
        this.props.login({ email: usuario.email, password: usuario.password }).then(() => {
          return navigate('/home');
        });
      }
    });
  }

  render() {
    let confirmPasswordStyle = {};
    if (this.state.password.length > 0 && this.state.confirmPassword !== this.state.password) {
      confirmPasswordStyle = { boxShadow: '0px 0px 4px 0px red' };
    }
    return (
      <div>
        <form style={{ width: '500px', margin: '10px auto' }} onSubmit={this.signUp}>
          <h2 style={{ textAlign: 'center', color: 'rgb(100,100,100)' }}>Registrar-se:</h2>
          <input
            name="username"
            type="text"
            placeHolder="Username"
            className="input-text m-2"
            value={this.state.username}
            onChange={this.onChange}
          />
          <input
            name="email"
            type="email"
            placeHolder="Email"
            className="input-text  m-2"
            value={this.state.email}
            onChange={this.onChange}
          />
          <textarea
            className="input-text  m-2"
            onChange={this.onChange}
            name="descricao"
            placeHolder="Descrição"
            value={this.state.descricao}
            style={{ resize: 'none', width: '100%', height: '200px' }}
          />
          <input
            name="password"
            type="password"
            placeHolder="Senha"
            className="input-text  m-2"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input
            name="confirmPassword"
            type="password"
            placeHolder="Confirme a Senha"
            className="input-text  m-2"
            value={this.state.confirmPassword}
            style={confirmPasswordStyle}
            onChange={this.onChange}
          />
          <button className="btn btn-primary" type="submit" style={{ float: 'right', borderRadius: '20px' }}>
            Registrar-se
          </button>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUpUsuario: PropTypes.func,
  login: PropTypes.func,
};

export default connect(
  () => {
    return {};
  },
  { signUpUsuario, login }
)(SignUp);
