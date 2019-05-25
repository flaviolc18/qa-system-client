import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSession } from '../redux/sessions.redux';
import { Link } from '@reach/router';

import ProfilePicture from './ProfilePicture';
import ActionButton from './ActionButton';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.post.descricao,
    };
  }

  renderEdit() {
    //FIXME: usar Textbox
    return (
      <div>
        <div className="pb-2">
          <input
            className="form-control"
            name="text"
            onChange={e => {
              this.setState({ text: e.target.value });
            }}
            type="text"
            value={this.state.text}
          />
        </div>
        <button
          onClick={() => {
            this.props.onFinishEdit(this.state.text);
          }}
          style={{ float: 'right' }}
          className="btn btn-success"
        >
          Update
        </button>
      </div>
    );
  }

  renderPost() {
    const { post } = this.props;
    return (
      <div style={{ overflow: 'hidden' }}>
        <p>{post.descricao}</p>
      </div>
    );
  }

  renderVoteButtons() {
    const { post, user, session, onUpvote, onDownvote } = this.props;
    return (
      <div>
        <div className="m-2">
          <ActionButton
            onClick={() => onUpvote({ id: post._id })}
            icon={'fa-thumbs-up'}
            visible={session && user._id}
            color={'green'}
          />
          {post.upvotes}
        </div>
        <div className="m-2">
          <ActionButton
            onClick={() => onDownvote({ id: post._id })}
            icon={'fa-thumbs-down'}
            visible={session && user._id}
            color={'red'}
          />
          {post.downvotes}
        </div>
      </div>
    );
  }

  renderCrudButtons() {
    const { post, user, session, onRemovePost, onEditClick } = this.props;

    return (
      <div className="row">
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
            onClick={() => onRemovePost({ id: post._id })}
            icon={'fa-trash'}
            visible={session && user._id && session.usuarioId === user._id}
            color={'red'}
          />
        </div>
      </div>
    );
  }

  render() {
    const { post, user, isEditing } = this.props;
    return (
      <div className="row m-2">
        <div className="mr-2">
          <ProfilePicture style={{ height: '45px', width: '45px', borderRadius: '5%' }} usuarioId={user._id} />
          {this.renderVoteButtons()}
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header">
              <div className="row m-0">
                <Link to={'/usuarios/' + user._id} className="font-weight-bold mr-1">
                  {user.username}
                </Link>
                {` posted on ${new Date(post.dataCriacao).toLocaleDateString()}`}
                <div className="ml-auto">{this.renderCrudButtons()}</div>
              </div>
            </div>
            <div className="card-body">{isEditing ? this.renderEdit() : this.renderPost()}</div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  session: PropTypes.object,
  onUpvote: PropTypes.func,
  onRemovePost: PropTypes.func,
  onDownvote: PropTypes.func,
  post: PropTypes.object,
  user: PropTypes.object,
  isEditing: PropTypes.bool,
  onFinishEdit: PropTypes.func,
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
