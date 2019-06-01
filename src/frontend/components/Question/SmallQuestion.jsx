import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { getUsuariosByFilter, loadUsuarioPergunta } from '../../redux/usuarios.redux';
import { getTagsByFilters, loadTags } from '../../redux/tags.redux';

class SmallQuestion extends Component {
  componentDidMount() {
    const {
      pergunta: { _id: perguntaId },
      loadUsuarioPergunta,
      loadTags,
    } = this.props;

    loadUsuarioPergunta({ perguntaId });
    loadTags({ perguntaId });
  }

  renderPergunta() {
    const { pergunta, usuario, tags } = this.props;
    return (
      <div className="d-flex flex-row" style={{ height: '100px' }}>
        <Votes pergunta={pergunta} />
        <div className="d-flex flex-column justify-content-around w-100">
          <Titulo pergunta={pergunta} />
          <TagList tags={tags} />
          <FooterInfo usuario={usuario} pergunta={pergunta} />
        </div>
      </div>
    );
  }

  render() {
    const { pergunta, usuario, tags } = this.props;

    return (
      <div
        style={{
          margin: '4px',
          borderBottom: 'solid 1px rgb(205,205,205)',
        }}
      >
        {pergunta && usuario && tags ? this.renderPergunta() : 'Loading...'}
      </div>
    );
  }
}

SmallQuestion.propTypes = {
  pergunta: PropTypes.object,
  usuario: PropTypes.object,
  tags: PropTypes.array,
  loadUsuarioPergunta: PropTypes.func,
  loadTags: PropTypes.func,
};

function Votes({ pergunta: { upvotes, downvotes } }) {
  // TODO: deveria mostrar o numero de respostas
  const QUANTIDADE_RESPOSTAS = 10;

  return (
    <div className="flex-d row m-0" style={{ width: '300px' }}>
      {[[upvotes, 'upvotes'], [QUANTIDADE_RESPOSTAS, 'respostas'], [downvotes, 'downvotes']].map(([e, v], index) => (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            width: '60px',
            height: '60px',
            color: '#606060',
          }}
          key={index}
        >
          <div className="font-weight-bold">{e}</div>
          <div style={{ fontSize: '11px' }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

Votes.propTypes = {
  pergunta: PropTypes.object,
};

function TagList({ tags }) {
  return (
    <div className="row m-0">
      {tags.map((tag, index) => (
        <div
          className="d-flex mr-1 px-2 align-items-center"
          style={{
            backgroundColor: 'rgb(135,206,250,0.4)',
            height: '25px',
            borderRadius: '10%',
            fontSize: '13px',
          }}
          key={index}
        >
          {/* TODO: linkar a pesquisa pela tag */}
          <Link to={'/todo'}>{tag.nome}</Link>
        </div>
      ))}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

function FooterInfo({ usuario, pergunta }) {
  return (
    <div
      className="ml-auto mb-2"
      style={{
        fontSize: '12px',
        color: '#606060',
      }}
    >
      <Link to={'/usuarios/' + usuario._id} className="font-weight-bold mr-1">
        {usuario.username}
      </Link>
      {` posted on ${new Date(pergunta.dataCriacao).toLocaleDateString()}`}
    </div>
  );
}

FooterInfo.propTypes = {
  usuario: PropTypes.object,
  pergunta: PropTypes.object,
};

function Titulo({ pergunta }) {
  return (
    <Link
      to={'/perguntas/' + pergunta._id}
      style={{
        fontSize: '18px',
      }}
    >
      {pergunta.titulo}
    </Link>
  );
}

Titulo.propTypes = {
  pergunta: PropTypes.object,
};

export default connect(
  (state, ownProps) => {
    return {
      usuario: getUsuariosByFilter(state, { perguntaId: ownProps.pergunta._id })[0],
      tags: getTagsByFilters(state, { perguntaId: ownProps.pergunta._id }),
    };
  },
  {
    loadUsuarioPergunta,
    loadTags,
  }
)(SmallQuestion);
