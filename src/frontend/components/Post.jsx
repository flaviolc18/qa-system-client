import React from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from './ProfilePicture';

function Votes({ votes }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{
        width: 40,
        height: 125,
      }}
    >
      <i className="fas fa-caret-up fa-3x" />
      <div className="t-2">{votes}</div>
      <i className="fas fa-caret-down fa-3x" />
    </div>
  );
}

Votes.propTypes = {
  votes: PropTypes.number,
};

function Box({ name, date, image }) {
  return (
    <div className="box">
      <div className="t-1">{`asked ${date}`}</div>
      <div className="d-flex align-items-center">
        <ProfilePicture image={image} />
        <div className="t-1 p-3">{name}</div>
      </div>
    </div>
  );
}

Box.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
};

function Post({ post, user }) {
  return (
    <div className="d-flex justify-content-around">
      <Votes votes={post.upvotes - post.downvotes} />
      <div className="d-flex flex-column align-items-end w-75">
        <div className="d-flex align-self-start">{post.descricao}</div>
        <Box className="d-flex align-self-end" name={user.nome} date={post.dataCriacao} image={user.profilePicture} />
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
