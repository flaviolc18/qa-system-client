import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadRespostasByPergunta, getRespostaByPergunta } from '../redux/respostas.redux';
import { loadUsuariosByPerguntaRespostas, getUsuario } from '../redux/usuarios.redux';
import Answer from './Answer';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.renderRespostas = this.renderRespostas.bind(this);
  }

  componentDidMount() {
    if (!this.props.perguntaId) {
      return '';
    }
    this.props.loadRespostasByPergunta({ perguntaId: this.props.perguntaId });
    this.props.loadUsuariosByPerguntaRespostas({ perguntaId: this.props.perguntaId });
  }

  renderRespostas() {
    if (!this.props.perguntaId) {
      return '';
    }
    return this.props.respostas.map((resposta, index) => {
      const usuario = this.props.usuarios[index];
      return <Answer key={'answer' + index} resposta={this.props.respostas[index]} user={usuario} />;
    });
  }
  render() {
    if (!this.props.perguntaId) {
      return '';
    }
    if (!this.props.respostas || this.props.respostas.length <= 0) {
      return <div>Loading</div>;
    }

    return <div>{this.renderRespostas()}</div>;
  }
}
Answers.propTypes = {
  loadRespostasByPergunta: PropTypes.func,
  perguntaId: PropTypes.string,
  respostas: PropTypes.array,
  usuarios: PropTypes.array,
  loadUsuariosByPerguntaRespostas: PropTypes.func,
};
export default connect(
  (state, ownProps) => {
    return {
      respostas: getRespostaByPergunta(state, { perguntaId: ownProps.perguntaId }),
      usuarios: getRespostaByPergunta(state, { perguntaId: ownProps.perguntaId }).map(({ usuarioId }) =>
        getUsuario(state, usuarioId)
      ),
    };
  },
  { loadRespostasByPergunta, loadUsuariosByPerguntaRespostas }
)(Answers);
