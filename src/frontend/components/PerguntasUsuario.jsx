import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadPerguntas, getPerguntaByFilters } from '../redux/perguntas.redux';
import { connect } from 'react-redux';
import { Link } from '@reach/router';

class PerguntasUsuario extends Component {
  componentDidMount() {
    this.props.loadPerguntas({ usuarioId: this.props.usuarioId });
  }
  renderPerguntas() {
    return this.props.perguntas.map((pergunta, index) => {
      return (
        <Link
          to={'/perguntas/' + pergunta._id}
          className="card m-1"
          key={index}
          style={{ backgroundColor: 'rgb(245,245,245)' }}
        >
          <h5>{pergunta.titulo}</h5>
        </Link>
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
  { loadPerguntas }
)(PerguntasUsuario);
