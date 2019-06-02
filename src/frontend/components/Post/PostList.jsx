import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const ColoredLine = () => <hr className="colored-line" />;

function PostList({ posts, users }) {
  return (
    <div>
      {posts
        .map((post, key) => {
          const user = users[post.usuarioId];
          return (
            <div key={`item-${key}`} className="mt-4 mb-4">
              <Post post={post} user={user} />
            </div>
          );
        })
        .reduce((prev, curr, key) => [prev, <ColoredLine key={`divider-${key}`} />, curr])}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  users: PropTypes.object,
};

export default PostList;
