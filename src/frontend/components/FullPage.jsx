import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSession, getSession, logout } from '../redux/sessions.redux';
import Navbar from './Navbar';
import Feed from './Feed';
import { navigate } from '@reach/router';
import ProfilePicture from './ProfilePicture';

class FullPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSessionChecked: false,
    };
  }
  componentDidMount() {
    this.props.loadSession().then(() => {
      this.setState({ isSessionChecked: true }, () => {
        if (this.props.location.pathname === '/login' && this.props.session) {
          navigate('/home');
        }
      });
    });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.location.href === this.props.location.href) {
      return;
    }
    this.props.loadSession().then(() => {
      this.setState({ isSessionChecked: true }, () => {
        if (this.props.location.pathname === '/login' && this.props.session) {
          navigate('/home');
        }
      });
    });
  }

  renderNavbar() {
    const loggedLinks = [
      { label: 'Postar Pergunta', class: 'navigation', type: 'link', to: '/postar-pergunta' },

      {
        label: () => (
          <ProfilePicture
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '100%',
            }}
            usuarioId={this.props.session.usuarioId}
          />
        ),
        class: 'action',
        type: 'dropdown',
        links: [
          {
            label: 'Perfil',
            class: 'action',
            type: 'button',
            action: () => navigate('/usuarios/' + this.props.session.usuarioId),
          },
          { label: 'Logout', class: 'action', type: 'button', action: () => this.props.logout() },
        ],
      },
    ];

    const unloggedLinks = [
      { label: 'Login', class: 'navigation', type: 'link', to: '/login' },
      { label: 'Registrar-se', class: 'navigation', type: 'link', to: '/registro-usuario' },
    ];
    const sharedLinks = [
      { label: 'Home', class: 'navigation', type: 'link', to: '/home' },
      {
        class: 'action',
        type: 'search',
        to: '/search',
        searchKey: 'tags',
      },
    ];

    let links = this.props.session ? sharedLinks.concat(loggedLinks) : sharedLinks.concat(unloggedLinks);

    return (
      <Navbar
        key={this.props.session ? 'nav-logged' : 'nav-unlogged'}
        to="/home"
        title={'Não faço a menor ideia?'}
        links={links}
      />
    );
  }

  render() {
    if (!this.state.isSessionChecked) {
      return 'Verificando Sessão...';
    }
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
  loadUsuario: PropTypes.func,
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
