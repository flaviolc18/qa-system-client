import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { PulseLoader } from 'react-spinners';

import { loadSession, getSession, logout } from '../redux/sessions.redux';
import { Navbar, Dropbox, SearchBar, Button } from './Navbar';

import Feed from './Feed/Feed';
import { ProfilePicture } from './Image';
import LoginModal from './Login/LoginModal';
import { Menu, MenuLink, MenuBody, SearchBarMenu } from './Menu';
import Logo from './Logo';

class FullPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
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

  getLinks() {
    const user =
      this.props.session && this.props.session.usuarioId ? (
        <Dropbox
          label={
            <ProfilePicture
              style={{ width: '50px', height: '50px', borderRadius: '10px' }}
              usuarioId={this.props.session.usuarioId}
            />
          }
          key={'logged-nav-profile-picture'}
        >
          <Button key={'dropdown-perfil'} onClick={() => navigate('/usuarios/' + this.props.session.usuarioId)}>
            Perfil
          </Button>
          <Button
            key={'dropdown-editar-perfil'}
            onClick={() => navigate('/editar-perfil/' + this.props.session.usuarioId)}
          >
            Editar Perfil
          </Button>
          <Button key={'dropdown-logout'} onClick={() => this.props.logout()}>
            Logout
          </Button>
        </Dropbox>
      ) : (
        <div>
          <button
            key={'button-login'}
            className="btn btn-outline-light m-2"
            onClick={e => {
              e.preventDefault();
              this.setState({ showLoginModal: true });
            }}
          >
            Login
          </button>
          <button
            key={'button-registrar'}
            className="btn btn-outline-light m-2"
            onClick={e => {
              e.preventDefault();
              navigate('/registrar');
            }}
          >
            Registrar
          </button>
        </div>
      );

    return [
      <SearchBar
        key={'unlogged-search-bar'}
        to="/perguntas/pesquisar"
        location={this.props.location}
        searchKey="keyword"
      />,
      user,
    ];
  }

  render() {
    if (!this.state.isSessionChecked) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '100vh',
            backgroundColor: '#343a40',
          }}
        >
          <Logo />
          <PulseLoader size={15} margin="2px" color={'#FFFFFF'} loading={true} />
        </div>
      );
    }
    return (
      <div key="full-page" style={{ height: '100%' }}>
        <LoginModal
          key={'login-modal'}
          isVisible={this.state.showLoginModal}
          onLogin={() => this.setState({ showLoginModal: false })}
          onBackgroundClick={() => this.setState({ showLoginModal: false })}
          session={this.props.session}
        />

        <Navbar key={this.props.session && this.props.session.usuarioId ? 'logged' : 'unlogged'}>
          <Logo key={'logo'} />
          <div key={'links'} style={{ marginRight: '430px' }} />,{this.getLinks()}
        </Navbar>

        <Feed key={'feed'}>
          <div key="page-col" className="col-md-auto p-0 m-0">
            <div
              style={{
                width: '800px',
                minWidth: '800px',
                backgroundColor: 'white',
              }}
              key={'page-body'}
            >
              {this.props.children}
            </div>
          </div>

          <div className="col-md-auto p-0 m-0">
            <div style={{ width: '250px', minWidth: '250px' }}>
              <Menu key={'menu'}>
                <MenuBody key={'menu-body'}>
                  <MenuLink key={'menu-link-1'} pathname={this.props.location.pathname} to="/">
                    <i className="fas fa-home" /> Home
                  </MenuLink>

                  {this.props.session && this.props.session.usuarioId ? (
                    <MenuLink key={'menu-link-2'} pathname={this.props.location.pathname} to="/postar-pergunta">
                      + Pergunta
                    </MenuLink>
                  ) : (
                    ''
                  )}

                  <div className="pb-4" />
                  <SearchBarMenu
                    key={'menu-searchbar'}
                    to="/perguntas/pesquisar"
                    location={this.props.location}
                    searchKey="tags"
                  />
                </MenuBody>
              </Menu>
            </div>
          </div>
        </Feed>
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
