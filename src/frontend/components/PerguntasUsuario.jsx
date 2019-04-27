import React, { Component } from 'react';
import { http } from '../helpers/http';
import PropTypes from 'prop-types';

class PerguntasUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perguntas: [],
    };
  }
  componentDidMount() {
    http.get('/api/perguntas/usuario/' + this.props.usuarioId).then(perguntas => this.setState({ perguntas }));
  }
  render() {
    return (
      <div>
        {this.state.perguntas.length <= 0 ? (
          <div>Nenhuma Pergunta encontrada para o Usuário!</div>
        ) : (
          <div>Perguntas</div>
        )}
      </div>
    );
  }
}

PerguntasUsuario.propTypes = {
  usuarioId: PropTypes.string,
};

export default PerguntasUsuario;
