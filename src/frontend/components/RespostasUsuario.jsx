import React, { Component } from 'react';
import { http } from '../helpers/http';
import PropTypes from 'prop-types';

class RespostasUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respostas: [],
    };
  }
  componentDidMount() {
    http.get('/api/respostas/usuario/' + this.props.usuarioId).then(respostas => this.setState(respostas));
  }
  render() {
    return (
      <div>
        {this.state.respostas.length <= 0 ? (
          <div>Nenhuma Resposta encontrada para o Usuário!</div>
        ) : (
          <div>Respostas</div>
        )}
      </div>
    );
  }
}

RespostasUsuario.propTypes = {
  usuarioId: PropTypes.string,
};

export default RespostasUsuario;
