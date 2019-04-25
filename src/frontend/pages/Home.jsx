import React, { Component } from 'react';

import PostList from '../components/PostList';

import mockUsuarios from '../mock/usuario.json';
import mockPerguntas from '../mock/pergunta.json';

class App extends Component {
  render() {
    return (
      <div className="teste">
        <div className="row justify-content-center">
          <h1>Página inicial</h1>

          <div
            style={{
              paddingTop: 50,
            }}
          >
            <PostList posts={mockPerguntas} users={mockUsuarios} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
