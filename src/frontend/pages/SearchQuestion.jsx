import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchPergunta, getPerguntaByFilters } from '../redux/perguntas.redux';
import QuestionListItem from '../components/QuestionListItem';
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
        <h3 className="mb-4">
          <i className="fas fa-search" />
          Perguntas:
        </h3>
        <ul className="list-group">
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
