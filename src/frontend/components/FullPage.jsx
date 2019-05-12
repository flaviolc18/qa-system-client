import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSession, getSession, logout } from '../redux/app.redux';
import Navbar from './Navbar';
import Feed from './Feed';
import { navigate } from '@reach/router';

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

  renderNavbar() {
    const loggedLinks = [
      { label: 'Home', class: 'navigation', type: 'link', to: '/home' },
      { label: 'Postar Pergunta', class: 'navigation', type: 'link', to: '/postar-pergunta' },
      { label: 'Logout', class: 'action', type: 'button', action: () => this.props.logout() },
      {
        label: 'Perfil',
        class: 'action',
        type: 'button',
        action: () => navigate('/usuarios/' + this.props.session.usuarioId),
      },
    ];

    const unloggedLinks = [
      { label: 'Login', class: 'navigation', type: 'link', to: '/login' },
      { label: 'Registrar-se', class: 'navigation', type: 'link', to: '/registro-usuario' },
    ];
    if (this.props.session) {
      return <Navbar key={'nav-logged'} to="/home" title={'Não Faço a Menor Ideia!'} links={loggedLinks} />;
    }
    return <Navbar key={'nav-unlogged'} to="/home" title={'Não Faço a Menor Ideia!'} links={unloggedLinks} />;
  }

  render() {
    return (
      <div>
        {this.renderNavbar()}
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
  logout: PropTypes.func,
};

export default connect(
  state => {
    return {
      session: getSession(state),
    };
  },
  { loadSession, logout }
)(FullPage);
