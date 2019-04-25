import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

function PostList({ posts, users }) {
  return (
    <div>
      {posts.map((post, key) => {
        const user = users[post.usuarioId];
        return (
          <div key={key} style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Post post={post} user={user} />;
          </div>
        );
      })}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  users: PropTypes.object,
};

export default PostList;
