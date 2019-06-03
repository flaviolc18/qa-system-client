import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from '@reach/router';

import { getSession } from '../../redux/sessions.redux';
import { loadVote, upvotePost, downvotePost, unvotePost, getVoteByFilters } from '../../redux/votes.redux';

import { ProfilePicture } from '../Image';
import ActionButton from './ActionButton';
import Modal from '../Modal/Modal';
import TextBox from '../TextBox/TextBox';
import LoginModal from '../Login/LoginModal';

const UPVOTE = 1;
const DOWNVOTE = -1;

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.post.descricao,
      showLoginModal: false,
    };
    this.textBox = React.createRef();
    this.onUpvoteClick = this.onUpvoteClick.bind(this);
    this.onDownvoteClick = this.onDownvoteClick.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.hideLoginModal = this.hideLoginModal.bind(this);
  }

  componentDidMount() {
    const { loadVote, post } = this.props;
    loadVote({ postId: post._id });
  }

  componentDidUpdate() {
    const { session, user, post, vote, loadVote } = this.props;
    if (session && user._id && !vote) {
      loadVote({ postId: post._id });
    }
  }

  renderEdit() {
    //FIXME: usar Textbox
    return (
      <div>
        <TextBox initialValue={this.state.text} placeHolder="Descrição" reference={this.textBox} />
        <div className="pb-2" />
        <button
          onClick={() => {
            this.props.onFinishEdit(this.textBox.current.value);
          }}
          style={{ float: 'right', borderRadius: '20px' }}
          className="btn btn-primary"
        >
          Atualizar
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

    return this.props[`${isVoteUpvote ? 'unvote' : 'upvote'}Post`]({ postId: post._id }).then(() =>
      loadPost({ id: post._id })
    );
  }

  onDownvoteClick() {
    const { post, vote, loadPost } = this.props;
    const isVoteDownvote = vote && vote.vote === DOWNVOTE;

    return this.props[`${isVoteDownvote ? 'unvote' : 'downvote'}Post`]({ postId: post._id }).then(() =>
      loadPost({ id: post._id })
    );
  }

  hideLoginModal() {
    this.setState(prevState => ({ ...prevState, showLoginModal: false }));
  }

  showLoginModal() {
    this.setState(prevState => ({ ...prevState, showLoginModal: true }));
  }

  renderVoteButtons() {
    const { post, user, session, vote } = this.props;

    const isVoteUpvote = vote && vote.vote === UPVOTE;
    const isVoteDownvote = vote && vote.vote === DOWNVOTE;

    return (
      <div>
        <LoginModal
          key={'login-modal'}
          isVisible={this.state.showLoginModal}
          onLogin={this.hideLoginModal}
          onBackgroundClick={this.hideLoginModal}
          session={session}
        />
        <div className="m-2">
          <ActionButton
            onClick={session && user._id ? this.onUpvoteClick : this.showLoginModal}
            icon={'fa-thumbs-up'}
            visible={true}
            color={isVoteUpvote ? 'green' : 'gray'}
          />
          {post.upvotes}
        </div>
        <div className="m-2">
          <ActionButton
            onClick={session && user._id ? this.onDownvoteClick : this.showLoginModal}
            icon={'fa-thumbs-down'}
            visible={true}
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
        <div className="col m-0">
          <div className="card">
            <div className="card-header">
              <div className="row m-0">
                <Link to={'/usuarios/' + user._id} className="font-weight-bold mr-1">
                  {user.username}
                </Link>
                {` Postou em ${new Date(post.dataCriacao).toLocaleDateString()}`}
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
      vote: getVoteByFilters(state, { postId: ownProps.post._id })[0],
    };
  },
  { loadVote, upvotePost, downvotePost, unvotePost }
)(Post);
