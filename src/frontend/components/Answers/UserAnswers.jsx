import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from '@reach/router';

import { loadRespostasByUsuario, getRespostaByPergunta } from '../../redux/respostas.redux';

class RespostasUsuario extends Component {
  componentDidMount() {
    this.props.loadRespostasByUsuario({ usuarioId: this.props.usuarioId });
  }
  renderRespostas() {
    return this.props.respostas.map((resposta, index) => {
      return (
        <div key={'resposta-' + index} style={{ borderRadius: '5px', backgroundColor: 'rgb(245,245,245)' }}>
          <Link to={'/perguntas/' + resposta.perguntaId}>
            <h5>{resposta.descricao}</h5>
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.props.respostas.length <= 0 ? (
          <div>Nenhuma Resposta encontrada para o Usuário!</div>
        ) : (
          <div>{this.renderRespostas()}</div>
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
