import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchPergunta, getPerguntaByFilters } from '../redux/perguntas.redux';
import SmallQuestion from '../components/Question/SmallQuestion/SmallQuestion';

class SearchQuestion extends Component {
  componentDidMount() {
    const query = this.props.location.search.slice(1);
    this.props.searchPergunta({ query });
  }
  componentDidUpdate(oldProps) {
    if (oldProps.location.search === this.props.location.search) return;

    const query = this.props.location.search.slice(1);
    this.props.searchPergunta({ query });
  }
  render() {
    return (
      <div>
        <h3 className="mb-4">
          <i className="fas fa-search" /> Resultados da Pesquisa:
        </h3>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {this.props.perguntas.map((question, i) => {
            return (
              <li key={i}>
                <SmallQuestion pergunta={question} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

SearchQuestion.propTypes = {
  location: PropTypes.object,
  searchPergunta: PropTypes.func,
  perguntas: PropTypes.array,
};
export default connect(
  (state, ownProps) => {
    const query = ownProps.location.search.slice(1);

    return {
      perguntas: getPerguntaByFilters(state, { query }),
    };
  },
  { searchPergunta }
)(SearchQuestion);
