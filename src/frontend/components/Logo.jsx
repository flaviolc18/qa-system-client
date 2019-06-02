import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

function Logo({ style }) {
  return (
    <Link className="title-link" to="/">
      <div className="row align-items-center p-0 m-0" style={{ ...style, color: 'white', minWidth: '200px' }}>
        <div
          className="col-md-auto align-self-center p-1 m-0 mr-2"
          style={{
            backgroundColor: 'rgb(255,255,255)',
            height: '55px',
            width: '55px',
            textAlign: 'center',
            borderRadius: '10px',
          }}
        >
          <h1 style={{ color: '#343a40' }}>Ñ</h1>
        </div>
        <div className="col align-self-center p-1 m-0 mt-2">
          <div>Faço a menor</div>
          <div>
            <h3>
              Ideia <i className="far fa-lightbulb" />
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
Logo.propTypes = {
  style: PropTypes.object,
};

export default Logo;
