import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

class Titulo extends Component {
  formatDescricao(descricao) {
    if (descricao.length > 100) {
      return descricao.slice(0, 100) + '...';
    }
    return descricao;
  }

  render() {
    const { pergunta } = this.props;

    return (
      <div className="col m-0 p-0 mb-2">
        <div className="row m-0 p-0">
          <Link to={'/perguntas/' + pergunta._id} className="small-question-title">
            {pergunta.titulo}
          </Link>
        </div>
        <div className="row m-0 p-0" style={{ color: 'rgb(0,0,0,0.5)' }}>
          {this.formatDescricao(pergunta.descricao)}
        </div>
      </div>
    );
  }
}

Titulo.propTypes = {
  pergunta: PropTypes.object,
};

export default Titulo;
