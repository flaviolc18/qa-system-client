import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadPerguntasUsuario, getPerguntaByFilters } from '../redux/perguntas.redux';
import { connect } from 'react-redux';
import SmallQuestion from './Question/SmallQuestion/SmallQuestion';

class PerguntasUsuario extends Component {
  componentDidMount() {
    this.props.loadPerguntas({ usuarioId: this.props.usuarioId });
  }
  renderPerguntas() {
    return this.props.perguntas.map((pergunta, index) => {
      return (
        <div key={'perguntas-' + index} style={{ borderRadius: '5px', backgroundColor: 'rgb(245,245,245)' }}>
          <SmallQuestion pergunta={pergunta} />
        </div>
      );
    });
  }
  render() {
    if (!this.props.perguntas) {
      return '';
    }

    return (
      <div>
        {this.props.perguntas.length <= 0 ? (
          <div>Nenhuma Pergunta encontrada para o Usuário!</div>
        ) : (
          <div>{this.renderPerguntas()}</div>
        )}
      </div>
    );
  }
}

PerguntasUsuario.propTypes = {
  usuarioId: PropTypes.string,
  perguntas: PropTypes.array,
  loadPerguntas: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      perguntas: getPerguntaByFilters(state, { usuarioId: ownProps.usuarioId }),
    };
  },
  { loadPerguntas: loadPerguntasUsuario }
)(PerguntasUsuario);
