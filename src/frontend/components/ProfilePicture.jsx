import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

function ProfilePicture({ image, usuarioId }) {
  return (
    <button
      style={{
        backgroundColor: '#000000',
        width: 40,
        height: 40,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
      }}
      onClick={e => {
        e.preventDefault();
        navigate('/usuarios/' + usuarioId);
      }}
    >
      <div
        style={{
          fontSize: 24,
          color: '#FFFFFF',
        }}
      >
        {image[0].toUpperCase()}
      </div>
    </button>
  );
}

ProfilePicture.propTypes = {
  image: PropTypes.string,
  usuarioId: PropTypes.string,
};

export default ProfilePicture;
