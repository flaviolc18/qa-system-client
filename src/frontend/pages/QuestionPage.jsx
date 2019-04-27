import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Question from '../components/Question';
import TextBoxArea from '../components/TextAreaBox';
import { postResposta } from '../redux/respostas.redux';
import { connect } from 'react-redux';
import { getSession } from '../helpers/session';
import Answers from '../components/Answers';

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.postResposta = this.postResposta.bind(this);
  }

  postResposta(text) {
    getSession().then(session => {
      let resposta = {
        descricao: text,
        upvotes: 0,
        downvotes: 0,
        usuarioId: session.usuarioId,
        perguntaId: this.props.id,
      };

      this.props.postResposta(resposta);
    });
  }

  render() {
    return (
      <div className="p-3">
        <Question id={this.props.id} />
        <Answers perguntaId={this.props.id} />
        <TextBoxArea onSubmit={state => this.postResposta(state.text)} />
      </div>
    );
  }
}

QuestionPage.propTypes = {
  id: PropTypes.string,
  postResposta: PropTypes.func,
};

export default connect(
  () => {
    return {};
  },
  { postResposta }
)(QuestionPage);
