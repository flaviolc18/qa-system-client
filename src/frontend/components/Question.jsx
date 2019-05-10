import React, { Component } from 'react';
import { loadPergunta, getPergunta } from '../redux/perguntas.redux';
import { getUsuariosByFilter, loadUsuarioPergunta } from '../redux/usuarios.redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from './Post';

class Question extends Component {
  componentDidMount() {}
  render() {
    if (!this.props.pergunta || !this.props.usuario) {
      return '';
    }
    return (
      <div className="row p-3">
        <div className="p-3" style={{ width: '100%', borderRadius: '5px', backgroundColor: 'rgb(245,245,245)' }}>
          <h3 className="">{`${this.props.pergunta.titulo}`}</h3>
          <Post post={this.props.pergunta} user={this.props.usuario} />
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  loadPergunta: PropTypes.func,
  loadUsuarioPergunta: PropTypes.func,
  pergunta: PropTypes.object,
  usuario: PropTypes.object,
  id: PropTypes.string,
};

export default connect(
  (state, ownProps) => {
    return {
      pergunta: getPergunta(state, ownProps.id),
      usuario: getUsuariosByFilter(state, { perguntaId: ownProps.id })[0],
    };
  },
  { loadUsuarioPergunta, loadPergunta }
)(Question);
