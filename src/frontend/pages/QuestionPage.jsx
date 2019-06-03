import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { postResposta } from '../redux/respostas.redux';
import { getSession } from '../redux/sessions.redux';
import { Question } from '../components/Question';
import TextBox from '../components/TextBox/TextBox';
import { Answers } from '../components/Answers';

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.textBox = React.createRef();
    this.postResposta = this.postAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  postAnswer(text) {
    if (this.props.session) {
      let resposta = {
        descricao: text,
        upvotes: 0,
        downvotes: 0,
        usuarioId: this.props.session.usuarioId,
        perguntaId: this.props.id,
      };

      this.props.postResposta(resposta, { perguntaId: resposta.perguntaId });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.props.session) {
      return;
    }

    let resposta = {
      descricao: this.textBox.current.value,
      upvotes: 0,
      downvotes: 0,
      usuarioId: this.props.session.usuarioId,
      perguntaId: this.props.id,
    };

    this.props.postResposta(resposta, { perguntaId: resposta.perguntaId });
    this.textBox.current.value = '';
  }

  render() {
    return (
      <div className="p-3">
        <Question id={this.props.id} />
        <Answers perguntaId={this.props.id} />
        <form className="pt-3" onSubmit={this.onSubmit}>
          <h3>Responder:</h3>
          <TextBox placeHolder="Resposta..." buttonMessage="Responder!" reference={this.textBox} />
          <button className="btn btn-primary" style={{ float: 'right', borderRadius: '20px' }} type="submit">
            Responder!
          </button>
        </form>
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
