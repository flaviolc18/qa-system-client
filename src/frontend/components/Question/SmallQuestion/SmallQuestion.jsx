import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUsuariosByFilter, loadUsuarioPergunta } from '../../../redux/usuarios.redux';
import { getTagsByFilters, loadTags } from '../../../redux/tags.redux';

import Titulo from './Title';
import TagList from './TagList';
import Votes from './Votes';
import FooterInfo from './FooterInfo';

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

  render() {
    const { pergunta, usuario, tags } = this.props;
    if (!pergunta || !usuario || !tags) {
      return (
        <div
          className="p-2"
          style={{
            width: '100%',
            height: '150px',

            backgroundColor: 'rgb(240,240,240)',
            borderRadius: '20px',
            margin: '10px',
          }}
        />
      );
    }
    return (
      <div
        style={{
          marginTop: '10px',
          marginBottom: '20px',
          border: '1px solid rgb(230,230,230)',
          borderRadius: '20px',
        }}
      >
        <div className="row p-2 m-2">
          <div className="col px-3 m-0">
            <Titulo pergunta={pergunta} />
            <div className="row p-0 m-0">
              <TagList tags={tags} />
            </div>
          </div>
        </div>
        <div
          className="row p-2 m-0 bg-light"
          style={{
            borderBottom: '1px solid rgb(220,220,220)',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          }}
        >
          <div className="col p-0 m-0">
            <FooterInfo usuario={usuario} pergunta={pergunta} />
          </div>
          <div className="col p-0 m-0">
            <Votes pergunta={pergunta} />
          </div>
        </div>
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
