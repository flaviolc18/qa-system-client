import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSession, getSession } from '../redux/app.redux';
import Navbar from './Navbar';
import Feed from './Feed';

const sharedLink = [{ label: 'Home', class: 'navigation', type: 'link', to: '/home' }];
const unloggedLinks = sharedLink.concat([
  { label: 'Login', class: 'navigation', type: 'link', to: '/login' },
  { label: 'Registrar-se', class: 'navigation', type: 'link', to: '/registro-usuario' },
]);
const loggedLink = sharedLink.concat([
  { label: 'Postar Pergunta', class: 'navigation', type: 'link', to: '/postar-pergunta' },
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
    return (
      <div>
<<<<<<< HEAD
        <Navbar to="/home" title={'Não Faço a Menor Ideia!'} links={debugLinks} />
=======
        <Navbar to="/home" title={'Não Faço a Menor Ideia'} links={debugLinks} />
>>>>>>> 2611a719559ba3e567f8b3cf7636207daeec0d37
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
