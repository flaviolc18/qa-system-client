import React, { Component } from 'react';
import Navbar from './Navbar';
import Feed from './Feed';
import PropTypes from 'prop-types';
import { http } from '../helpers/http';
import { getSession } from '../helpers/session';
import { navigate } from '@reach/router';
const sharedLink = [{ label: 'Home', class: 'navigation', type: 'link', to: '/home' }];
const unloggedLinks = sharedLink.concat([
  { label: 'Login', class: 'navigation', type: 'link', to: '/login' },
  { label: 'Registrar-se', class: 'navigation', type: 'link', to: '/registro-usuario' },
]);
const loggedLink = sharedLink.concat([
  { label: 'Postar Pergunta', class: 'navigation', type: 'link', to: '/postar-pergunta' },
  {
    label: <div>Perfil</div>,
    class: 'action',
    type: 'button',
    action: () => {
      getSession().then(session => navigate('/usuarios/' + session.usuarioId));
    },
  },
  {
    label: (
      <div>
        Logout
        {'  '}
        <i className="fas fa-sign-out-alt" />
      </div>
    ),
    class: 'action',
    type: 'button',
    action: () => http.delete('/api/usuarios/logout'),
  },
]);

const debugLinks = unloggedLinks.concat(loggedLink);

class FullPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(oldProps) {
    if (oldProps.location.href === this.props.location.href) {
      return;
    }
  }

  render() {
    return (
      <div>
        <Navbar to="/home" title={'Não Faço a Menor Ideia'} links={debugLinks} />
        <Feed>{this.props.children}</Feed>
      </div>
    );
  }
}

FullPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  location: PropTypes.object,
};

export default FullPage;
