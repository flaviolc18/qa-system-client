import React, { Component } from 'react';

import TextAreaBox from '../components/TextAreaBox';
import PropTypes from 'prop-types';
import { getSession } from '../helpers/session';

import { postPergunta } from '../redux/perguntas.redux';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

class PostarPergunta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.post = this.post.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }
  onChangeTitle(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  post(state) {
    return getSession().then(session => {
      const questionBody = {
        titulo: this.state.title,
        descricao: state.text,
        dataCriacao: new Date(),
        upvotes: 0,
        downvotes: 0,
        usuarioId: session.usuarioId,
      };

      return this.props.postPergunta(questionBody).then(pergunta => {
        pergunta = pergunta.elements[0];
        navigate('/perguntas/' + pergunta._id);
      });
    });
  }

  render() {
    return (
      <div className="p-3">
        <h2>Postar Pergunta:</h2>
        <div className="pb-1" />
        <br />
        Titulo:
        <br />
        <input
          onChange={this.onChangeTitle}
          type="text"
          className="form-control"
          style={{ resize: 'none', width: '100%', height: '50px', fontSize: '30px' }}
        />
        <br />
        Descrição:
        <TextAreaBox onSubmit={this.post} />
      </div>
    );
  }
}

PostarPergunta.propTypes = {
  postPergunta: PropTypes.func,
};

export default connect(
  () => {
    return {};
  },
  { postPergunta }
)(PostarPergunta);
