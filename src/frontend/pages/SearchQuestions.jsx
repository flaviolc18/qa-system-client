import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchPergunta, getPerguntaByFilters } from '../redux/perguntas.redux';
import QuestionListItem from '../components/Question/SimpleQuestion';

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
          <i className="fas fa-search" />
          Perguntas:
        </h3>
        <ul className="list-group m-2">
          {this.props.perguntas.map((question, i) => {
            return (
              <li key={i} className="list-group-item">
                <QuestionListItem perguntaId={question._id} usuarioId={question.usuarioId} pergunta={question} />
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
