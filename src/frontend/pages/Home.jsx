import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from '@reach/router';

import { loadPerguntas, getPerguntaByFilters } from '../redux/perguntas.redux';

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
    this.props.loadPerguntas({});
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
    return this.props.perguntas.map((pergunta, index) => {
      return (
        <div
          style={{ margin: '4px', borderBottom: 'solid 1px rgb(205,205,205)', fontSize: '30px' }}
          key={'pergunta' + index}
        >
          <div style={{ height: '40px' }} />
          <Link style={{ color: 'black' }} to={'/perguntas/' + pergunta._id}>
            {pergunta.titulo}
          </Link>
          <div style={{ fontSize: '15px', float: 'right' }}>{new Date(pergunta.dataCriacao).toLocaleDateString()}</div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.perguntas) {
      return '';
    }
    return (
      <div>
        <h1>
          <i className="fas fa-align-left" /> Perguntas Recentes:
        </h1>
        <div className="p-3" />
        <div className="pl-5 pr-5">{this.renderPerguntas()}</div>
      </div>
    );
  }
}

Home.propTypes = {
  loadPerguntas: PropTypes.func,
  perguntas: PropTypes.array,
};

export default connect(
  state => {
    return {
      perguntas: getPerguntaByFilters(state, {}),
    };
  },
  { loadPerguntas }
)(Home);
