import React, { Component } from 'react';
import Form from '../components/Form';
import { http } from '../helpers/http';

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

class RegistroUsuario extends Component {
  registrar(e, state) {
    e.preventDefault();
    if (state.Senha != state['Confirmar Confirmar Senha']) {
      alert('As senhas não são iguais!');
      return;
    }

    const userDate = {
      nome: state.Nome,
      login: state.Email,
      senha: state.Senha,
      descricao: state.descricao,
      reputacao: 0,
    };

    http.post('/api/usuarios', userDate);
  }
  render() {
    return (
      <div className="row pt-5">
        <div className="col" />
        <div className="col">
          <Form body={registroBody} submit={this.registrar} submitLabel="Registrar!" />
        </div>
        <div className="col" />
      </div>
    );
  }
}
export default RegistroUsuario;
