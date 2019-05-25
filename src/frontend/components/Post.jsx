import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSession } from '../redux/sessions.redux';

import Box from './Box';
import ActionButton from './ActionButton';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      titulo: '',
      descricao: '',
    };

    this.onEdit = this.onEdit.bind(this);
    this.edit = this.edit.bind(this);
  }

  onEdit(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  edit(e) {
    e.preventDefault();
    this.props
      .editPost({ id: this.props.post._id }, { titulo: this.state.titulo, descricao: this.state.descricao })
      .then(() => {
        this.setState({ editing: false });
      });
  }
  renderEdit() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <form onSubmit={this.edit}>
          <div className="form-group">
            {this.props.titulo && (
              <div className="pb-2">
                <input
                  className="form-control"
                  name="titulo"
                  onChange={this.onEdit}
                  type="text"
                  value={this.state.titulo}
                />
              </div>
            )}
            {this.props.post.descricao && (
              <div className="pb-2">
                <input
                  className="form-control"
                  name="descricao"
                  onChange={this.onEdit}
                  type="text"
                  value={this.state.descricao}
                />
              </div>
            )}
            <button style={{ float: 'right' }} className="btn btn-success" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }

  renderTitulo() {
    const { titulo } = this.props;
    return (
      <div>
        <h3>{titulo}</h3>
        <hr className="colored-line" />
      </div>
    );
  }

  renderPost() {
    const { post } = this.props;
    return (
      <div style={{ overflow: 'hidden' }}>
        <h5>{post.descricao}</h5>
      </div>
    );
  }

  renderVoteButtons() {
    const { post, user, votes, session, upVote, downVote } = this.props;
    return (
      <div>
        <div className="m-2">
          <ActionButton
            onClick={() => upVote({ id: post._id })}
            icon={'fa-thumbs-up'}
            visible={session && user._id}
            color={'green'}
          />
          {votes.upvotes}
        </div>
        <div className="m-2">
          <ActionButton
            onClick={() => downVote({ id: post._id })}
            icon={'fa-thumbs-down'}
            visible={session && user._id}
            color={'red'}
          />
          {votes.downvotes}
        </div>
      </div>
    );
  }

  renderCrudButtons() {
    const { post, user, session, removePost, onEditClick } = this.props;

    return (
      <div>
        <div>
          <ActionButton
            onClick={onEditClick}
            icon={'fa-edit'}
            visible={session && user._id && session.usuarioId === user._id}
            color={'black'}
          />
        </div>
        <div>
          <ActionButton
            onClick={() => removePost({ id: post._id })}
            icon={'fa-trash'}
            visible={session && user._id && session.usuarioId === user._id}
            color={'red'}
          />
        </div>
      </div>
    );
  }

  render() {
    const { post, user, titulo, isEditing } = this.props;
    return (
      <div>
        <div className="col"> {this.state.editing && titulo ? this.renderEdit() : this.renderTitulo()}</div>

        <div className="row m-0 p-0">
          {this.renderVoteButtons()}

          <div className="col"> {isEditing ? this.renderEdit() : this.renderPost()}</div>

          <Box usuarioId={user._id} name={user.username} date={post.dataCriacao} src={user.profilePicture} />
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  redirect: PropTypes.bool,
  path: PropTypes.string,
  session: PropTypes.object,
  votes: PropTypes.object,
  upVote: PropTypes.func,
  editPost: PropTypes.func,
  removePost: PropTypes.func,
  downVote: PropTypes.func,
  titulo: PropTypes.string,
  post: PropTypes.object,
  user: PropTypes.object,
  index: PropTypes.number,
  isEditing: PropTypes.bool,
  onEditClick: PropTypes.func,
};

export default connect(
  state => {
    return {
      session: getSession(state),
    };
  },
  {}
)(Post);
