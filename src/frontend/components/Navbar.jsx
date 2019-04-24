import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
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
            <button className="btn action-button font-navbar" key={index} onClick={() => link.action()}>
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

  renderFullNavbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <ul className="navbar-nav" style={{ float: 'left' }}>
                  {this.computeLinks()}
                </ul>
              </div>

              <Link className="navbar-title" to={this.props.to}>
                {this.props.title}
              </Link>

              <div className="col">
                <ul className="navbar-nav" style={{ float: 'right' }}>
                  {this.computeActions()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  renderSmallNavbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <Link className="navbar-title" to={this.props.to}>
          {this.props.title}
        </Link>

        <button
          className="btn button-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-align-justify" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">{this.computeLinks()}</ul>

          <ul className="navbar-nav">{this.computeActions()}</ul>
        </div>
      </nav>
    );
  }

  render() {
    return (
      <div style={{}}>
        <MediaQuery query="(max-width: 991px)">{this.renderSmallNavbar()}</MediaQuery>
        <MediaQuery query="(min-width: 991px)">{this.renderFullNavbar()}</MediaQuery>
      </div>
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
      <Link
        style={{ color: 'white' }}
        className={'nav-link font-navbar ' + (disabled ? 'disabled' : active ? 'active' : '')}
        to={to}
      >
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
    <li className="nav-item dropdown font-navbar">
      <a
        style={{ color: 'white' }}
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
