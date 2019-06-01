import React from 'react';
import PropTypes from 'prop-types';

function Votes({ pergunta: { upvotes, downvotes } }) {
  // TODO: deveria mostrar o numero de respostas
  const QUANTIDADE_RESPOSTAS = 10;

  return (
    <div className="row justify-content-end m-0 p-0 mr-2">
      {[[upvotes, 'upvotes'], [QUANTIDADE_RESPOSTAS, 'respostas'], [downvotes, 'downvotes']].map(([e, v], index) => (
        <div
          style={{
            color: '#606060',
          }}
          key={index}
        >
          <div style={{ fontSize: '18px', textAlign: 'center' }} className="col align-self-center p-0 m-0 mr-2">
            <div className="font-weight-bold">{e}</div>
          </div>
          <div className="col align-self-center p-0 m-0 mr-2">
            <div style={{ fontSize: '14px', textAlign: 'center' }}>{v}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

Votes.propTypes = {
  pergunta: PropTypes.object,
};

export default Votes;
