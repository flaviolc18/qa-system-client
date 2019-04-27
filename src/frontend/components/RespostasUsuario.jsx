import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadRespostasByUsuario, getRespostaByPergunta } from '../redux/respostas.redux';
import { connect } from 'react-redux';
import { Link } from '@reach/router';

class RespostasUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respostas: [],
    };
  }
  componentDidMount() {
    this.props.loadRespostasByUsuario({ usuarioId: this.props.usuarioId });
  }
  renderPerguntas() {
    return this.props.respostas.map((resposta, index) => {
      return (
        <Link
          to={'/perguntas/' + resposta.perguntaId}
          className="card m-1"
          key={index}
          style={{ backgroundColor: 'rgb(245,245,245)' }}
        >
          <h5>{resposta.descricao}</h5>
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        {this.props.respostas.length <= 0 ? (
          <div>Nenhuma Resposta encontrada para o Usuário!</div>
        ) : (
          <div>{this.renderPerguntas()}</div>
        )}
      </div>
    );
  }
}

RespostasUsuario.propTypes = {
  usuarioId: PropTypes.string,
  loadRespostasByUsuario: PropTypes.func,
  respostas: PropTypes.array,
};

export default connect(
  (state, ownProps) => {
    return {
      respostas: getRespostaByPergunta(state, { usuarioId: ownProps.usuarioId }),
    };
  },
  { loadRespostasByUsuario }
)(RespostasUsuario);
