import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import { connect } from 'react-redux';
import { getUsuario, loadUsuario } from '../../redux/usuarios.redux';
import { loadPergunta, getPergunta } from '../../redux/perguntas.redux';
import { Link } from '@reach/router';
import { serialize } from '../../../utils/serializer';

class QuestionListItem extends Component {
  componentDidMount() {
    this.props.loadPergunta({ id: this.props.perguntaId });
    this.props.loadUsuario({ id: this.props.usuarioId });
  }
  render() {
    if (!this.props.pergunta || !this.props.usuario) {
      return '';
    }
    const dataCriacao = new Date(this.props.pergunta.dataCriacao);
    return (
      <div className="row  p-0 m-0">
        <div className="col-md-auto align-self-start p-0 m-0 pr-4">
          <Link to={'/usuarios/' + this.props.usuario._id}>
            <Image style={{ width: '70px', height: '70px' }} id={this.props.usuario.fotoPerfil} />
          </Link>
        </div>
        <div className="col p-0 m-0">
          <Link className="question-list-item-title" to={'/perguntas/' + this.props.pergunta._id}>
            <h4>{this.props.pergunta.titulo}</h4>
          </Link>

          <div style={{ color: '#494949' }} className="row p-0 m-0">
            <strong>Up:</strong>
            {this.props.pergunta.upvotes}
            <div className="m-1" />
            <strong>Down:</strong>
            {this.props.pergunta.downvotes}
          </div>
        </div>
        <div>{dataCriacao.toLocaleDateString()}</div>
      </div>
    );
  }
}

// const Tag = ({ tagValue }) => {
//   return (
//     <Link className="tag" to={'/search/' + serialize({ tags: tagValue })}>
//       <i className="fas fa-tags" />
//       {' ' + tagValue}
//     </Link>
//   );
// };
// Tag.propTypes = {
//   tagValue: PropTypes.string,
// };

QuestionListItem.propTypes = {
  perguntaId: PropTypes.string,
  usuarioId: PropTypes.string,
  pergunta: PropTypes.object,
  usuario: PropTypes.object,
  loadPergunta: PropTypes.func,
  loadUsuario: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      pergunta: getPergunta(state, ownProps.perguntaId),
      usuario: getUsuario(state, ownProps.usuarioId),
    };
  },
  { loadPergunta, loadUsuario }
)(QuestionListItem);
