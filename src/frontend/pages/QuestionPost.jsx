import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

import { postPergunta } from '../redux/perguntas.redux';
import { getSession } from '../redux/app.redux';
import TextAreaBox from '../components/TextBox';

class QuestionPost extends Component {
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
    if (this.props.session) {
      const questionBody = {
        titulo: this.state.title,
        descricao: state.text,
        usuarioId: this.props.session.usuarioId,
      };

      return this.props.postPergunta(questionBody).then(pergunta => {
        pergunta = pergunta.elements[0];
        navigate('/perguntas/' + pergunta._id);
      });
    }
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
          disabled={this.props.session ? false : true}
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

QuestionPost.propTypes = {
  postPergunta: PropTypes.func,
  session: PropTypes.object,
};

export default connect(
  state => {
    return {
      session: getSession(state),
    };
  },
  { postPergunta }
)(QuestionPost);
