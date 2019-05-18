import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Location, Link } from '@reach/router';
import { connect } from 'react-redux';
import { getSession } from '../redux/app.redux';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.links = this.props.links.map(link => {
      if (link.class == 'navigation') {
        return link;
      }
    });
    this.links = this.links.filter(e => e != undefined);

    this.actions = this.props.links.map(link => {
      if (link.class == 'action') {
        return link;
      }
    });

    this.actions = this.actions.filter(e => e != undefined);
  }

  computeLinks() {
    return this.computeElements(this.links);
  }
  computeActions() {
    return this.computeElements(this.actions);
  }
  computeElements(links) {
    return links.map((link, index) => {
      switch (link.type) {
        case 'link':
          return <Navlink key={index} label={link.label} to={link.to} />;
        case 'dropdown':
          return <Dropdown key={index} label={link.label} links={link.links} />;
        case 'search':
          return <Search />;
        case 'button':
          return (
            <button className="action-button" key={index} onClick={() => link.action()}>
              {link.label}
            </button>
          );
      }
    });
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="navbar-title"> {this.props.title}</div>
        <ul className="navbar-nav">{this.computeLinks()}</ul>
        <div style={{ width: 'auto', margin: '0 auto' }} />
        <ul className="navbar-nav">{this.computeActions()}</ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
  to: PropTypes.string,
  session: PropTypes.object,
};

const Navlink = ({ label, disabled, active, to }) => {
  return (
    <li className="navbar-item">
      <Link className={'navbar-link ' + (disabled ? 'disabled' : active ? 'active' : '')} to={to}>
        {label}
      </Link>
    </li>
  );
};

Navlink.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  to: PropTypes.string,
};

const Search = () => (
  <form className="form-inline my-2 my-lg-0">
    <div className="row">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </div>
  </form>
);

class Dropdown extends Component {
  computeElementsDropdown(links) {
    return links.map((link, index) => {
      switch (link.type) {
        case 'link':
          return (
            <li className="dropdown-item" key={index}>
              <Link style={{ margin: '0 auto', width: '100%' }} className={'navbar-link'} to={link.to}>
                {link.label}
              </Link>
            </li>
          );
        case 'button':
          return (
            <li key={index} className="dropdown-item">
              <button className="dropdown-button" style={{ border: 'none' }} onClick={() => link.action()}>
                {link.label}
              </button>
            </li>
          );
      }
    });
  }

  render() {
    const { label, links } = this.props;
    let title;

    switch (typeof label) {
      case 'string':
        title = label;
        break;
      case 'function':
        title = label();
        break;
    }
    return (
      <li className="nav-item dropdown">
        <a
          className=""
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {title}
        </a>
        <div
          style={{ position: 'absolute' }}
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdown"
        >
          <ul className="navbar-dropdown">{this.computeElementsDropdown(links)}</ul>
        </div>
      </li>
    );
  }
}

Dropdown.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  links: PropTypes.array,
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
