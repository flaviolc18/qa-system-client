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
      lettersCount: '0',
      title: '',
      tags: '',
    };
    this.textBox = React.createRef();

    this.onPost = this.onPost.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    e.preventDefault();

    if (e.target.name === 'title') {
      if (this.state.title.length >= 250) {
        return;
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  onPost(e) {
    e.preventDefault();
    if (!this.props.session) {
      return;
    }

    const descricao = this.textBox.current.value;

    let tags = this.state.tags.split(',');
    tags = tags.filter(tag => tag !== '');
    tags = [...new Set(tags)];

    if (tags.length <= 0) {
      alert('É nescessário definir ao menos uma Tag para a pergunta!');
      return;
    }
    const questionBody = {
      titulo: this.state.title,
      descricao,
      tags,
      usuarioId: this.props.session.usuarioId,
    };

    return this.props.postPergunta(questionBody).then(pergunta => {
      pergunta = pergunta.elements[0];
      navigate('/perguntas/' + pergunta._id);
    });
  }
  render() {
    let tags = this.state.tags.split(',');
    tags = tags.filter(tag => tag !== '' && tag != ' ');
    tags = [...new Set(tags)];
    return (
      <div className="p-3">
        <h2>+Pergunta:</h2>
        <div className="pb-1" />

        <form onSubmit={this.onPost}>
          <input
            className="input-text"
            placeHolder="Pergunta..."
            onChange={this.onChange}
            disabled={this.props.session ? false : true}
            name="title"
            type="text"
            style={{ resize: 'none', width: '100%', height: '50px', fontSize: '20px' }}
          />
          <div className="mr-3 mb-3" style={{ color: 'gray', float: 'right' }}>
            Letras disponíveis: {250 - this.state.title.length}
          </div>
          <TextAreaBox reference={this.textBox} placeHolder="Descrição" />
          <input
            onChange={this.onChange}
            name="tags"
            placeHolder="Tags..."
            disabled={this.props.session ? false : true}
            type="text"
            className="input-text"
          />
          <div className="row p-0 m-0 mt-3">
            {tags.map((tag, index) => (
              <div className="tag" key={index}>
                {tag}
              </div>
            ))}
          </div>
          <div className="mb-4" />
          <button className="btn btn-primary" style={{ float: 'right', borderRadius: '20px' }} type="submit">
            +Pergunta
          </button>
        </form>
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
