import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Location, Link, navigate } from '@reach/router';
import { connect } from 'react-redux';
import { getSession } from '../redux/sessions.redux';
import { serialize } from '../helpers/serializer';

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
          return <Search searchKey={link.searchKey} to={link.to} key={index} />;
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
        <nav style={{ width: '1200px', margin: '0 auto' }} className="navbar">
          <ul className="navbar-nav">{this.computeElements(this.links)}</ul>
          <div style={{ width: 'auto', margin: '0 auto' }} />
          <ul className="navbar-nav">{this.computeElements(this.actions)}</ul>
        </nav>
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

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: '',
    };
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSearch(e) {
    e.preventDefault();
    navigate(this.props.to + '/' + serialize({ [this.props.searchKey]: this.state.searchBarText }));
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onSearch} className="form-inline my-2 my-lg-0">
        <div className="row p-0 m-0 mr-4">
          <input
            name="searchBarText"
            onChange={this.onChange}
            value={this.state.searchBarText}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </div>
      </form>
    );
  }
}

Search.propTypes = {
  to: PropTypes.string,
  searchKey: PropTypes.string,
};

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
