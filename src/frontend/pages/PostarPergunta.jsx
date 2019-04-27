import React, { Component } from 'react';

import TextAreaBox from '../components/TextAreaBox';

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
    const questionBody = {
      titulo: this.state.title,
      descricao: state.text,
    };
    alert(questionBody);
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
export default PostarPergunta;
