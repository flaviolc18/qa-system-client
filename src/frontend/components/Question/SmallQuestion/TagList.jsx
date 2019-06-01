import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { serialize } from '../../../../utils/serializer';

function TagList({ tags }) {
  return (
    <div className="row m-0 p-0">
      {tags.map((tag, index) => (
        <Link key={index} className="tag" to={'/perguntas/pesquisar?' + serialize({ tags: tag.nome })}>
          {tag.nome}
        </Link>
      ))}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default TagList;
