import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

import { postPergunta } from '../redux/perguntas.redux';
import { getSession } from '../redux/sessions.redux';
import TextAreaBox from '../components/TextBox/TextBox';

class QuestionPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
    };
    this.post = this.post.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  post(state) {
    if (this.props.session) {
      let tags = this.state.tags.split(',');
      tags = tags.filter(tag => tag !== '');
      tags = [...new Set(tags)];

      if (tags.length <= 0) {
        alert('É nescessário definir ao menos uma Tag para a pergunta!');
      }

      const questionBody = {
        titulo: this.state.title,
        descricao: state.text,
        tags,
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
          onChange={this.onChange}
          disabled={this.props.session ? false : true}
          name="title"
          type="text"
          className="form-control"
          style={{ resize: 'none', width: '100%', height: '50px', fontSize: '30px' }}
        />
        <br />
        Descrição:
        <TextAreaBox onSubmit={this.post} />
        Tags:
        <input
          onChange={this.onChange}
          name="tags"
          disabled={this.props.session ? false : true}
          type="text"
          className="form-control"
          style={{ resize: 'none', width: '100%', height: '50px', fontSize: '30px' }}
        />
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
