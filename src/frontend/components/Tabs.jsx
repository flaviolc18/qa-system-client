import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Location, Link, navigate } from '@reach/router';

import { serialize, deserialize } from '../helpers/serializer';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };

    this.changeStateTab = this.changeStateTab.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.renderStateBody = this.renderStateBody.bind(this);
    this.renderUrlBody = this.renderUrlBody.bind(this);
    this.getUrlTabIndex = this.getUrlTabIndex.bind(this);

    if (this.props.useUrl) {
      const search = this.props.location.search.substr(1);
      let filter = deserialize(search);
      filter[this.props.tabName] = this.getUrlTabIndex() || 0;
      navigate(this.props.location.pathname + '?' + serialize(filter));
    }
  }

  changeStateTab(e, index) {
    e.preventDefault();
    if (this.props.useUrl) this.setState({ activeTab: index });
  }

  getUrlTabIndex() {
    const indexPos = this.props.location.search.indexOf(this.props.tabName) + this.props.tabName.length + 1;
    const index = parseInt(this.props.location.search[indexPos]);
    return index;
  }

  renderUrlBody() {
    const index = this.getUrlTabIndex();

    return this.props.tabs[index] ? this.props.tabs[index].component : '';
  }

  renderStateBody() {
    return this.props.tabs[this.state.activeTab] ? this.props.tabs[this.state.activeTab].component : '';
  }
  renderBody() {
    if (this.props.useUrl) {
      return this.renderUrlBody();
    }

    this.renderStateBody();
  }

  render() {
    let tabIndex = this.state.activeTab;
    if (this.props.useUrl) {
      tabIndex = this.getUrlTabIndex();
    }

    return (
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            {this.props.tabs.map((tab, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={this.props.useUrl ? '?' + this.props.tabName + '=' + index : ''}
                  onClick={this.props.useUrl ? () => {} : e => this.changeStateTab(e, index)}
                  className={'nav-link ' + (tabIndex === index ? 'active' : '')}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body">{this.renderBody()}</div>
      </div>
    );
  }
}
Tabs.defaultProps = {
  useUrl: true,
  tabName: 'tab',
};

Tabs.propTypes = {
  tabs: PropTypes.array,
  useUrl: PropTypes.bool,
  tabName: PropTypes.string,
  location: PropTypes.object,
};

export default Object.assign(
  props => <Location>{({ location }) => <Tabs location={location} {...props} />}</Location>,
  { displayName: 'Tabs' }
);
