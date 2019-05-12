import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import ProfilePicture from './ProfilePicture';

function Votes({ votes }) {
  return (
    <div
      className="col"
      style={{
        width: '40px',
        float: 'left',
      }}
    >
      <div className="row justify-content-center">
        <button className="btn btn-sm">
          <i className="fas fa-caret-up fa-3x" />
        </button>
      </div>
      <div className="row justify-content-center">
        <div className="t-2">{votes}</div>
      </div>
      <div className="row justify-content-center">
        <button className="btn btn-sm">
          <i className="fas fa-caret-down fa-3x" />
        </button>
      </div>
    </div>
  );
}

Votes.propTypes = {
  votes: PropTypes.number,
};

function Box({ usuarioId, name, date }) {
  return (
    <div className="row p-2" style={{ float: 'right' }}>
      <ProfilePicture
        onClick={e => {
          e.preventDefault();
          navigate('/usuarios/' + usuarioId);
        }}
        style={{ float: 'left', height: '70px', width: '70px', borderRadius: '100%' }}
        usuarioId={usuarioId}
      />
      <div className="pr-2" />
      <div style={{ float: 'right' }}>
        <div>{name}</div>
        <div className="t-1">{new Date(date).toLocaleDateString()}</div>
      </div>
    </div>
  );
}

Box.propTypes = {
  usuarioId: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  src: PropTypes.string,
};

function Post({ post, user }) {
  return (
    <div>
      <div>
        <div>{post.descricao}</div>
        <Box usuarioId={user._id} name={user.username} date={post.dataCriacao} src={user.profilePicture} />
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  index: PropTypes.number,
};

export default Post;
