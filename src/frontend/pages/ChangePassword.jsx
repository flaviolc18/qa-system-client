import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsuario, loadUsuario, changePasswordUsuario } from '../redux/usuarios.redux';
import { navigate } from '@reach/router';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassord: '',
      newPassword: '',
    };
    this.onChange = this.onChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.loadUsuario({ id: this.props.usuarioId });
  }

  changePassword(e) {
    e.preventDefault();
    if (!this.state.newPassword === this.state.confirmPassord) {
      alert('As senhas são diferentes!');
      return;
    }
    const { confirmPassord, ...body } = this.state;
    this.props.changePasswordUsuario({ id: this.props.usuarioId }, body).then(response => {
      if (response.elements && response.elements[0]) {
        navigate('/usuarios/' + this.props.usuarioId);
      } else {
        alert('Senha atual incorreta!');
      }
    });
  }
  render() {
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <h3>Mudar Senha</h3>
        <form onSubmit={this.changePassword} className="form-container">
          <label>Senha Atual</label>
          <input name="password" onChange={this.onChange} className="form-control" type="password" />
          <label>Nova Senha</label>
          <input name="confirmPassord" onChange={this.onChange} className="form-control" type="password" />
          <label>Confirmar Senha</label>
          <input name="newPassword" onChange={this.onChange} className="form-control" type="password" />
          <button className="btn btn-success mt-3" type="submit">
            Atualiar
          </button>
        </form>
      </div>
    );
  }
}
ChangePassword.propTypes = {
  usuarioId: PropTypes.string,
  usuario: PropTypes.object,
  loadUsuario: PropTypes.func,
  changePasswordUsuario: PropTypes.func,
};
export default connect(
  (state, ownProps) => {
    return {
      usuario: getUsuario(state, ownProps.usuarioId),
    };
  },
  { loadUsuario, changePasswordUsuario }
)(ChangePassword);
