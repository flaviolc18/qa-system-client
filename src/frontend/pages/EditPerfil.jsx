import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { getUsuario, loadUsuario, updateUsuario } from '../redux/usuarios.redux';
import { navigate } from '@reach/router';

class EditPerfilt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      descricao: '',
    };
    this.onChange = this.onChange.bind(this);
    this.editUser = this.editUser.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId }).then(response => {
      this.setState({ username: response.elements[0].username, descricao: response.elements[0].descricao });
    });
  }

  editUser(e) {
    e.preventDefault();
    this.props.updateUsuario({ id: this.props.usuarioId }, this.state).then(() => {
      navigate('/usuarios/' + this.props.usuarioId);
    });
  }
  render() {
    if (!this.props.usuario) {
      return '';
    }
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <h3>Editar Pefil</h3>
        <form onSubmit={this.editUser} className="form-container">
          <label>Nome de Usuario</label>
          <input
            name="username"
            className="form-control"
            onChange={this.onChange}
            type="text"
            value={this.state.username}
          />
          <label>Descrição</label>
          <input
            name="descricao"
            className="form-control"
            onChange={this.onChange}
            type="text"
            value={this.state.descricao}
          />
          <div className="row p-0 m-0 pt-3">
            <button className="btn btn-success" type="submit">
              {' '}
              Atualiar
            </button>
            <Link className="ml-4" to={'/mudar-senha/' + this.props.usuarioId}>
              Alterar Senha
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
EditPerfilt.propTypes = {
  usuarioId: PropTypes.string,
  usuario: PropTypes.object,
  loadUsuario: PropTypes.func,
  updateUsuario: PropTypes.func,
};
export default connect(
  (state, ownProps) => {
    return {
      usuario: getUsuario(state, ownProps.usuarioId),
    };
  },
  { loadUsuario, updateUsuario }
)(EditPerfilt);
