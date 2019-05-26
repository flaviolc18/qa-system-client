import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { serialize } from '../helpers/serializer';
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

export default Search;
