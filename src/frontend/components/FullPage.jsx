import React, { Component } from 'react';
import Navbar from './Navbar';
import Feed from './Feed';
import PropTypes from 'prop-types';
import { http } from '../helpers/http';

const sharedLink = [{ label: 'Home', class: 'navigation', type: 'link', to: '/home' }];
const unloggedLinks = sharedLink.concat([
  { label: 'Login', class: 'navigation', type: 'link', to: '/login' },
  { label: 'Registrar-se', class: 'navigation', type: 'link', to: '/registro-usuario' },
]);
const loggedLink = sharedLink.concat([
  { label: 'Postar Pergunta', class: 'navigation', type: 'link', to: '/postar-pergunta' },
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
    action: () => alert('Logout'),
  },
]);

const AppContext = React.createContext({
  isLogged: false,
  usuarioId: '',
});

class FullPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false, usuarioId: '' };
    this.getUserState = this.getUserState.bind(this);
  }

  getUserState() {
    http.get('/api/sessions').then(session => {
      if (session && session.usuarioId)
        if (session.usuarioId != this.state.usuarioId) {
          this.setState({ isLogged: true, usuarioId: session.usuarioId });
        }
    });
  }

  componentDidMount() {
    this.getUserState();
  }

  componentDidUpdate() {
    this.getUserState();
  }

  render() {
    const value = this.state;

    return (
      <div>
        <AppContext.Provider value={value}>
          <AppContext.Consumer>
            {value => (
              <div>
                <Navbar
                  context={value}
                  to="/home"
                  title={'Não Faço a Menor Ideia'}
                  links={this.state.isLogged ? loggedLink : unloggedLinks}
                />
                <Feed context={value}>{this.props.children}</Feed>
              </div>
            )}
          </AppContext.Consumer>
        </AppContext.Provider>
      </div>
    );
  }
}

FullPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FullPage;
