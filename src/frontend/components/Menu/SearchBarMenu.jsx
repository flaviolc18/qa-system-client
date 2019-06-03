import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { serialize, deserialize } from '../../../utils/serializer';
import { navigate } from '@reach/router';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: '',
    };
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const query = deserialize(this.props.location.search.slice(1));

    const value = Array.isArray(query[this.props.searchKey])
      ? query[this.props.searchKey].join(',')
      : query[this.props.searchKey];

    this.setState({ searchBarText: value || '' });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.location.search === this.props.location.search) return;

    const query = deserialize(this.props.location.search.slice(1));

    const value = Array.isArray(query[this.props.searchKey])
      ? query[this.props.searchKey].join(',')
      : query[this.props.searchKey];

    this.setState({ searchBarText: value || '' });
  }

  onSearch(e) {
    e.preventDefault();
    navigate(this.props.to + '?' + serialize({ [this.props.searchKey]: this.state.searchBarText.split(',') }));
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.onSearch}>
        <div className="row p-0 m-0 mr-4">
          <input
            name="searchBarText"
            className="searchBarMenu"
            onChange={this.onChange}
            value={this.state.searchBarText}
            type="search"
            placeholder="Pesquisar Tag"
            aria-label="Search"
            autoComplete="off"
          />
          <button className="searchButtonMenu" type="submit">
            <i className="fas fa-search" />
          </button>
        </div>
        <div className="row p-0 m-0 mt-3">
          {this.state.searchBarText.split(',').map((tag, index) => (
            <div className="tag" key={index}>
              {tag}
            </div>
          ))}
        </div>
      </form>
    );
  }
}

Search.propTypes = {
  location: PropTypes.object,
  to: PropTypes.string,
  searchKey: PropTypes.string,
};

export default Search;
