import React, { Component } from 'react';
import { navigate } from '@reach/router';

import { http } from '../helpers/http';
import Form from '../components/Form';

const registroBody = [
  {
    label: 'Nome',
    defaultValue: '',
    class: 'input',
    type: 'text-area',
    placeHolder: 'Escolha seu nome sem menntir',
  },
  { label: 'Email', defaultValue: '', class: 'input', type: 'email', placeHolder: 'example@mail.com' },
  {
    label: 'Senha',
    defaultValue: '',
    class: 'input',
    type: 'password',
    placeHolder: 'Senha',
  },
  {
    label: 'Confirmar Confirmar Senha',
    defaultValue: '',
    class: 'input',
    type: 'password',
    placeHolder: 'Confirme sua Senha',
  },
  {
    label: 'Descriçao',
    defaultValue: '',
    class: 'input',
    type: 'text-area',
    placeHolder: 'Digite aqui uma descrição simples sopre você',
  },
];

class SignUp extends Component {
  signUp(e, state) {
    e.preventDefault();
    if (state.Senha != state['Confirmar Confirmar Senha']) {
      alert('As senhas não são iguais!');
      return;
    }

    const userData = {
      username: state.Nome,
      email: state.Email,
      password: state.Senha,
      descricao: state.descricao,
      reputacao: 0,
      profilePicture: '1234',
    };

    http.post('/api/usuarios/signup', userData).then(response => {
      if (response) {
        navigate('/login');
      }
    });
  }
  render() {
    return (
      <div className="row pt-5">
        <div className="col" />
        <div className="col">
          <Form body={registroBody} submit={this.signUp} submitLabel="Registrar!" />
        </div>
        <div className="col" />
      </div>
    );
  }
}
export default SignUp;
