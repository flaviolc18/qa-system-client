import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPerguntasTrending, getPerguntaByFilters } from '../redux/perguntas.redux';

import SmallQuestion from '../components/Question/SmallQuestion/SmallQuestion';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    this.props.loadPerguntasTrending();
  }
  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  submit(e) {
    e.preventDefault();
    alert(this.state.email);
  }

  renderPerguntas() {
    return this.props.perguntas.map((pergunta, index) => <SmallQuestion pergunta={pergunta} key={index} />);
  }

  render() {
    if (!this.props.perguntas) {
      return '';
    }
    return (
      <div className="mt-5">
        <h3>
          <i className="fas fa-align-left" /> Trending perguntas:
        </h3>
        <div className="px-3 mt-5">{this.renderPerguntas()}</div>
      </div>
    );
  }
}

Home.propTypes = {
  loadPerguntasTrending: PropTypes.func,
  perguntas: PropTypes.array,
};

export default connect(
  state => {
    return {
      perguntas: getPerguntaByFilters(state, {}),
    };
  },
  { loadPerguntasTrending }
)(Home);
