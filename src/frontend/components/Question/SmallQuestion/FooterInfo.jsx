import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import ProfilePicture from '../../ProfilePicture';

function FooterInfo({ usuario, pergunta }) {
  return (
    <div
      className="row align-items-end m-0"
      style={{
        fontSize: '12px',
        color: '#606060',
      }}
    >
      <div className="col-md-auto m-0 p-0 mr-2 mb-2">
        <ProfilePicture
          style={{ width: '40px', height: '40px', borderRadius: '10px' }}
          usuario={usuario}
          usuarioId={usuario._id}
        />
      </div>
      <div className="col align-self-start m-0 p-0 mb-2">
        <div className="row-md-auto m-0 p-0">
          <Link style={{ fontSize: '14px' }} to={'/usuarios/' + usuario._id} className="font-weight-bold">
            {usuario.username}
          </Link>
        </div>
        <div className="row-md-auto m-0 p-0">Postado em {`${new Date(pergunta.dataCriacao).toLocaleDateString()}`}</div>
      </div>
    </div>
  );
}

FooterInfo.propTypes = {
  usuario: PropTypes.object,
  pergunta: PropTypes.object,
};

export default FooterInfo;
