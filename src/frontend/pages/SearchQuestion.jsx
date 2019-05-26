import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchPergunta, getPerguntaByFilters } from '../redux/perguntas.redux';

class SearchQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.searchPergunta({ search: this.props.filter });
  }

  componentDidUpdate(oldProps) {
    if (this.props.filter !== oldProps.filter) {
      this.props.searchPergunta({ search: this.props.filter });
    }
  }
  render() {
    if (!this.props.perguntas) {
      return '';
    }

    return (
      <div>
        {this.props.perguntas.map((p, i) => {
          return <div key={i}>{p.titulo}</div>;
        })}
      </div>
    );
  }
}

SearchQuestion.propTypes = {
  filter: PropTypes.string,
  searchPergunta: PropTypes.func,
  perguntas: PropTypes.array,
};
export default connect(
  (state, ownProps) => {
    return {
      perguntas: getPerguntaByFilters(state, { search: ownProps.filter }),
    };
  },
  { searchPergunta }
)(SearchQuestion);
