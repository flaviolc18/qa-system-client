import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import ProfilePicture from './ProfilePicture';

function Box({ usuarioId, name, date }) {
  return (
    <div style={{ color: 'dark-gray' }} className="row p-0 m-0 align-items-center">
      <div className="col p-0 pr-2 m-0">
        <ProfilePicture
          onClick={e => {
            e.preventDefault();
            navigate('/usuarios/' + usuarioId);
          }}
          style={{ height: '45px', width: '45px', borderRadius: '100%' }}
          usuarioId={usuarioId}
        />
      </div>
      <div className="col-md-auto align-self-start p-0 m-0 pr-2">
        <div>{name}</div>
        <div>{new Date(date).toLocaleDateString()}</div>
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

export default Box;
