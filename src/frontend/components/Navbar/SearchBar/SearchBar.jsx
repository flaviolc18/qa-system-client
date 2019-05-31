import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { serialize } from '../../../../utils/serializer';
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
      <form className="form-inline" onSubmit={this.onSearch}>
        <div className="row p-0 m-0 mr-4">
          <input
            name="searchBarText"
            className="searchBar"
            onChange={this.onChange}
            value={this.state.searchBarText}
            type="search"
            placeholder="Pesquisar"
            aria-label="Search"
          />
          <button className="searchButton" type="submit">
            <i className="fas fa-search" />
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

export default Search;
