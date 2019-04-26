import React from 'react';
import PropTypes from 'prop-types';

function ProfilePicture({ image }) {
  return (
    <div
      style={{
        backgroundColor: '#000000',
        width: 40,
        height: 40,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
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
    </div>
  );
}

ProfilePicture.propTypes = {
  image: PropTypes.string,
};

export default ProfilePicture;
