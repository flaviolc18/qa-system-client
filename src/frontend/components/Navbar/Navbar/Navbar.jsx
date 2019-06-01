import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { connect } from 'react-redux';
import { getSession } from '../../../redux/sessions.redux';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark" style={{ minWidth: '1200px' }}>
        <div className="navbar" style={{ margin: '0 auto' }}>
          {this.props.children}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default connect(
  state => {
    return {
      session: getSession(state),
    };
  },
  {}
)(
  Object.assign(props => <Location>{({ location }) => <Navbar location={location} {...props} />}</Location>, {
    displayName: 'Navbar',
  })
);
