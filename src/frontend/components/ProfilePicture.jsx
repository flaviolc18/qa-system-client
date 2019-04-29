import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { http } from '../helpers/http';

const base64Flag = 'data:image/jpeg;base64,';

function ProfilePicture({ size, src, route }) {
  const [source, setSource] = useState(null);
  useEffect(() => {
    if (src) {
      const imageStr = Buffer.from(src).toString('base64');
      setSource(base64Flag + imageStr);
    }
  }, [src]);

  const onChange = e => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append('image', image);

    http.upload(route, formData).then(response => {
      if (response.error) {
        alert(response.error);
        return;
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: '#cecece',
        width: size,
        height: size,
        borderRadius: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <img src={source} style={{ width: size, height: size, borderRadius: '100%' }} />
      <span>
        <label htmlFor={'uploadInput'} className="ui icon button">
          <i className="fas fa-upload fa-2x" />
        </label>
        <input type="file" id={'uploadInput'} style={{ display: 'none' }} onChange={onChange} />
      </span>
    </div>
  );
}

ProfilePicture.propTypes = {
  size: PropTypes.number,
  route: PropTypes.string,
  src: PropTypes.object,
};

export default ProfilePicture;
