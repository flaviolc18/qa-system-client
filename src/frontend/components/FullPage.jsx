import React, { Component } from 'react';
import Navbar from './Navbar';
import Feed from './Feed';
import PropTypes from 'prop-types';
import { http } from '../helpers/http';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { castSession } from '../helpers/session';

import { loadSession, getSession } from '../redux/app.redux';

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
      castSession().then(session => navigate('/usuarios/' + session.usuarioId));
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
  componentDidMount() {
    this.props.loadSession();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.location.href === this.props.location.href) {
      return;
    }
    this.props.loadSession();
  }

  render() {
    console.log(this.props.session);
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
  loadSession: PropTypes.func,
  session: PropTypes.object,
};

export default connect(
  state => {
    return {
      session: getSession(state),
    };
  },
  { loadSession }
)(FullPage);
