import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSession, getSession, logout } from '../redux/sessions.redux';
import { Navbar, Dropbox, SearchBar, Button } from './Navbar';

import Feed from './Feed/Feed';
import { navigate } from '@reach/router';
import { ProfilePicture } from './Image';
import LoginModal from './Login/LoginModal';
import { Menu, MenuLink, MenuBody, SearchBarMenu } from './Menu';

const Logo = ({ style }) => (
  <div className="row align-items-center p-0 m-0" style={{ ...style, color: 'white' }}>
    <div
      className="col-md-auto align-self-center p-1 m-0 mr-2"
      style={{
        backgroundColor: '#6e7882',
        height: '55px',
        width: '55px',
        textAlign: 'center',
        borderRadius: '10px',
      }}
    >
      <h1>Ñ</h1>
    </div>
    <div className="col-md-auto p-0 m-0">
      <div className="row align-items-start p-0 m-0">Faço a menor</div>
      <div className="row align-items-end p-0 m-0">
        <h3>Ideia</h3>
      </div>
    </div>
  </div>
);
Logo.propTypes = {
  style: PropTypes.object,
};

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
          <Button onClick={() => navigate('/usuarios/' + this.props.session.usuarioId)}>Perfil</Button>
          <Button onClick={() => navigate('/editar-perfil/' + this.props.session.usuarioId)}>Editar Perfil</Button>
          <Button onClick={() => this.props.logout()}>Logout</Button>
        </Dropbox>
      ) : (
        <div>
          <button
            className="btn btn-outline-light m-2"
            onClick={e => {
              e.preventDefault();
              this.setState({ showLoginModal: true });
            }}
          >
            Login
          </button>
          <button
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
        </div>
      );
    }
    return (
      <div>
        <LoginModal
          isVisible={this.state.showLoginModal}
          onLogin={() => this.setState({ showLoginModal: false })}
          onBackgroundClick={() => this.setState({ showLoginModal: false })}
          session={this.props.session}
        />

        <Navbar key={this.props.session && this.props.session.usuarioId ? 'logged' : 'unlogged'}>
          <Logo />
          <div style={{ marginRight: '430px' }} />,{this.getLinks()}
        </Navbar>

        <Feed>
          <div className="col-md-auto p-0 m-0">
            <div style={{ width: '800px', minWidth: '800px', minHeight: '100%', backgroundColor: 'white' }}>
              {this.props.children}
            </div>
          </div>

          <div className="col-md-auto p-0 m-0" style={{ borderLeft: '1px solid rgb(220,220,220)', minHeight: '100vh' }}>
            <div style={{ width: '250px', minWidth: '250px', minHeight: '100%' }}>
              <Menu>
                <MenuBody>
                  <MenuLink pathname={this.props.location.pathname} to="/">
                    <i className="fas fa-home" /> Home
                  </MenuLink>

                  <MenuLink pathname={this.props.location.pathname} to="/postar-pergunta">
                    + Pergunta
                  </MenuLink>

                  <div className="pb-4" />
                  <SearchBarMenu to="/perguntas/pesquisar" location={this.props.location} searchKey="tags" />
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
