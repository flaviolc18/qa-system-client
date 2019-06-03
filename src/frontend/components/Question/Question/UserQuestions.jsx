import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadPerguntasUsuario, getPerguntaByFilters } from '../../../redux/perguntas.redux';
import { connect } from 'react-redux';
import SmallQuestion from '../SmallQuestion/SmallQuestion';
import { FadeLoader } from 'react-spinners';

class PerguntasUsuario extends Component {
  componentDidMount() {
    this.props.loadPerguntas({ usuarioId: this.props.usuarioId });
  }
  renderPerguntas() {
    return this.props.perguntas.map((pergunta, index) => {
      return (
        <div key={'perguntas-' + index}>
          <SmallQuestion pergunta={pergunta} />
        </div>
      );
    });
  }
  render() {
    if (!this.props.perguntas) {
      return (
        <div style={{ margin: '100px 400px' }}>
          <FadeLoader sizeUnit={'px'} size={2} color={'#555555'} loading={true} />
        </div>
      );
    }

    return <div>{this.props.perguntas.length <= 0 ? '' : <div>{this.renderPerguntas()}</div>}</div>;
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
