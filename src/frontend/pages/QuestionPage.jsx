import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { http } from '../helpers/http';

import Post from '../components/Post';
import PostList from '../components/PostList';

const ColoredLine = () => <hr className="colored-line" />;
const NotFount = () => <div>Pergunta não encontrada...</div>;
const Loading = () => <div>Loading...</div>;

const Question = ({ id }) => {
  const [pergunta, setPergunta] = useState('LOADING');
  const [respostas, setRespostas] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    http.get(`http://localhost:9001/api/perguntas/${id}`).then(pergunta => {
      if (pergunta.error) {
        setPergunta('NOT_FOUND');
        return;
      }

      setPergunta(pergunta);

      http.get(`http://localhost:9001/api/perguntas/${id}/usuario`).then(usuario => {
        setUsuario(usuario);
      });

      http.get(`http://localhost:9001/api/perguntas/${id}/respostas`).then(respostas => {
        setRespostas(respostas);
      });

      http.get(`http://localhost:9001/api/perguntas/${id}/respostas/usuarios`).then(usuarios => {
        setUsuarios(
          (usuarios || []).reduce((objUsuarios, usuario) => {
            objUsuarios[usuario._id] = usuario;
            return objUsuarios;
          }, {})
        );
      });
    });
  }, []);

  switch (pergunta) {
    case 'NOT_FOUND':
      return <NotFount />;
    case 'LOADING':
      return <Loading />;

    default:
      return (
        <div>
          <h3 className="ml-5">{`${pergunta.titulo}`}</h3>
          <ColoredLine />

          <div className="mt-1 mb-3">
            <div className="mt-3 mb-3">{usuario && <Post post={pergunta} user={usuario} />}</div>
            <ColoredLine />
            {respostas && usuarios && <PostList posts={respostas} users={usuarios} />}
          </div>
        </div>
      );
  }
};

Question.propTypes = {
  id: PropTypes.string,
};

function QuestionPage({ id }) {
  return (
    <div className="teste">
      <div className="row justify-content-start p-3">
        <Question id={id} />
      </div>
    </div>
  );
}

QuestionPage.propTypes = {
  id: PropTypes.string,
};

export default QuestionPage;
