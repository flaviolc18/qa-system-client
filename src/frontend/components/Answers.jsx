import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadRespostasByPergunta, getRespostaByPergunta } from '../redux/respostas.redux';
import Answer from './Answer';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.renderRespostas = this.renderRespostas.bind(this);
  }

  componentDidMount() {
    if (!this.props.perguntaId) {
      return;
    }
    this.props.loadRespostasByPergunta({ perguntaId: this.props.perguntaId });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.respostas.length === this.props.respostas.length) {
      return;
    }
    this.props.loadRespostasByPergunta({ perguntaId: this.props.perguntaId });
  }

  renderRespostas() {
    if (!this.props.perguntaId) {
      return '';
    }
    return this.props.respostas.map((resposta, index) => {
      return (
        <div key={'answer' + index}>
          <Answer resposta={resposta} />
        </div>
      );
    });
  }
  render() {
    if (!this.props.perguntaId) {
      return '';
    }

    return (
      <div className="mt-4">
        <h5>{`${this.props.respostas.length} Respostas`}</h5>
        <ul style={{ listStyle: 'none' }} className="list-group">
          {this.renderRespostas()}
        </ul>
      </div>
    );
  }
}
Answers.propTypes = {
  loadRespostasByPergunta: PropTypes.func,
  perguntaId: PropTypes.string,
  respostas: PropTypes.array,
};
export default connect(
  (state, ownProps) => {
    return {
      respostas: getRespostaByPergunta(state, { perguntaId: ownProps.perguntaId }),
    };
  },
  { loadRespostasByPergunta }
)(Answers);
