import React, { Component } from 'react';
import Navbar from './Navbar';
import Feed from './Feed';
import PropTypes from 'prop-types';

const links = [
  { label: 'Home', class: 'navigation', type: 'link', to: '/home' },
  { label: 'Login', class: 'navigation', type: 'link', to: '/login' },
  { label: 'Registrar-se', class: 'navigation', type: 'link', to: '/registro-usuario' },
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
  { label: 'Dropdown', class: 'navigation', type: 'dropdown', links: [{ label: 'Teste', to: 'Teste' }] },
];

class FullPage extends Component {
  componentDidUpdate() {
    console.log('update');
  }
  render() {
    return (
      <div>
        <Navbar to="home" title={'Não Faço a Menor Ideia'} links={links} />
        <Feed>{this.props.children}</Feed>
      </div>
    );
  }
}

FullPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FullPage;
