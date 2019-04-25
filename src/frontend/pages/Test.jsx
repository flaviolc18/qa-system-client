import React from 'react';

import PostList from '../components/PostList';

import mockUsuarios from '../mock/usuario.json';
import mockPerguntas from '../mock/pergunta.json';

function Test() {
  return (
    <div
      style={{
        paddingTop: 50,
      }}
    >
      <PostList posts={mockPerguntas} users={mockUsuarios} />
    </div>
  );
}

export default Test;
