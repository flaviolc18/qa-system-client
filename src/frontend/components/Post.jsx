import React from 'react';
import PropTypes from 'prop-types';

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

function Box({ name, date, image }) {
  return (
    <div className="box">
      <div className="t-1">{`asked ${date}`}</div>
      <ProfilePicture image={image} />
      <div>{name}</div>
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
    <div>
      <Votes votes={post.upvotes - post.downvotes} />
      <div>
        <div>{post.descricao}</div>
        <Box name={user.username} date={post.dataCriacao} image={user.profilePicture} />
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
