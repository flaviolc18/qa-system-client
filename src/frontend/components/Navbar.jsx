import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Location, Link } from '@reach/router';

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
            <button className="btn action-button" key={index} onClick={() => link.action()}>
              {link.label}
            </button>
          );
      }
    });
  }

  computeLinks() {
    return this.computeElements(this.links);
  }
  computeActions() {
    return this.computeElements(this.actions);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          {this.props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {<ul className="navbar-nav">{this.computeLinks()}</ul>}
          <div style={{ margin: '0 auto' }} />
          <ul className="navbar-nav">{this.computeActions()}</ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
  to: PropTypes.string,
};

const Navlink = ({ label, disabled, active, to }) => {
  return (
    <li className="nav-item">
      <Link className={'nav-link ' + (disabled ? 'disabled' : active ? 'active' : '')} to={to}>
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

const Dropdown = ({ label, links }) => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        {links.map((link, index) => (
          <Link className="dropdown-item" key={index} to={link.to}>
            {link.label}
          </Link>
        ))}
      </div>
    </li>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  links: PropTypes.array,
};

export default Object.assign(
  props => <Location>{({ location }) => <Navbar location={location} {...props} />}</Location>,
  { displayName: 'Navbar' }
);
