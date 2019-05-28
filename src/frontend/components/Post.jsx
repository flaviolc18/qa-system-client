import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from '@reach/router';

import { getSession } from '../redux/sessions.redux';
import { loadVote, upvotePost, downvotePost, unvotePost, getVoteByFilters } from '../redux/votes.redux';

import ProfilePicture from './ProfilePicture';
import ActionButton from './ActionButton';
import Modal from './Modal';

const UPVOTE = 1;
const DOWNVOTE = -1;

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.post.descricao,
    };
    this.onUpvoteClick = this.onUpvoteClick.bind(this);
    this.onDownvoteClick = this.onDownvoteClick.bind(this);
  }

  componentDidMount() {
    const { loadVote, post } = this.props;
    loadVote({ id: post._id });
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

  onUpvoteClick() {
    const { post, vote, loadPost } = this.props;
    const isVoteUpvote = vote && vote.vote === UPVOTE;

    return this.props[`${isVoteUpvote ? 'unvote' : 'upvote'}Post`]({ id: post._id }).then(() =>
      loadPost({ id: post._id })
    );
  }

  onDownvoteClick() {
    const { post, vote, loadPost } = this.props;
    const isVoteDownvote = vote && vote.vote === DOWNVOTE;

    return this.props[`${isVoteDownvote ? 'unvote' : 'downvote'}Post`]({ id: post._id }).then(() =>
      loadPost({ id: post._id })
    );
  }

  renderVoteButtons() {
    const { post, user, session, vote } = this.props;

    const isVoteUpvote = vote && vote.vote === UPVOTE;
    const isVoteDownvote = vote && vote.vote === DOWNVOTE;

    return (
      <div>
        <div className="m-2">
          <ActionButton
            onClick={this.onUpvoteClick}
            icon={'fa-thumbs-up'}
            visible={session && user._id}
            color={isVoteUpvote ? 'green' : 'gray'}
          />
          {post.upvotes}
        </div>
        <div className="m-2">
          <ActionButton
            onClick={this.onDownvoteClick}
            icon={'fa-thumbs-down'}
            visible={session && user._id}
            color={isVoteDownvote ? 'red' : 'gray'}
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
          <Modal
            title={'Deseja remover?'}
            modalId={`remove-modal-${post._id}`}
            bodyText={'A remoção deste post não pode ser desfeita.'}
            onConfirm={() => onRemovePost({ id: post._id })}
          />
          <ActionButton
            dataToggle="modal"
            dataTarget={`#remove-modal-${post._id}`}
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
  vote: PropTypes.object,
  onRemovePost: PropTypes.func,
  loadPost: PropTypes.func,
  loadVote: PropTypes.func,
  upvotePost: PropTypes.func,
  downvotePost: PropTypes.func,
  unvotePost: PropTypes.func,
  post: PropTypes.object,
  user: PropTypes.object,
  isEditing: PropTypes.bool,
  onFinishEdit: PropTypes.func,
  onEditClick: PropTypes.func,
};

export default connect(
  (state, ownProps) => {
    return {
      session: getSession(state),
      vote: getVoteByFilters(state, { id: ownProps.post._id })[0],
    };
  },
  { loadVote, upvotePost, downvotePost, unvotePost }
)(Post);
