import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Question from '../components/Question';
import TextBoxArea from '../components/TextAreaBox';
import { postResposta } from '../redux/respostas.redux';
import { connect } from 'react-redux';
import Answers from '../components/Answers';
import { getSession } from '../redux/app.redux';

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.postResposta = this.postResposta.bind(this);
  }

  postResposta(text) {
    if (this.props.session) {
      let resposta = {
        descricao: text,
        upvotes: 0,
        downvotes: 0,
        usuarioId: this.props.session.usuarioId,
        perguntaId: this.props.id,
      };

      this.props.postResposta(resposta);
    }
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
  session: PropTypes.object,
};

export default connect(
  state => {
    return { session: getSession(state) };
  },
  { postResposta }
)(QuestionPage);
