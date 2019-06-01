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
  formatTitulo(titulo) {
    console.log(titulo.length);

    if (titulo.length >= 65) {
      return titulo.slice(0, 65) + '...';
    }
    return titulo;
  }
  render() {
    const { pergunta } = this.props;

    return (
      <div className="col m-0 p-0 mb-2">
        <div className="row m-0 p-0">
          <Link to={'/perguntas/' + pergunta._id} className="small-question-title">
            {this.formatTitulo(pergunta.titulo)}
          </Link>
        </div>
        <div className="row m-0 p-0" style={{ color: 'gray' }}>
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
