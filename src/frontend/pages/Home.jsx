import React, { Component } from 'react';

import PostList from '../components/PostList';

import mockUsuarios from '../mock/usuario.json';
import mockPerguntas from '../mock/pergunta.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  submit(e) {
    e.preventDefault();
    alert(this.state.email);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <h1>Página inicial</h1>
      </div>
    );
  }
}

export default App;
