import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { getSession } from '../redux/sessions.redux';
import ProfilePicture from './ProfilePicture';

function Box({ usuarioId, name, date }) {
  return (
    <div style={{ color: 'dark-gray' }} className="row p-0 m-0 align-items-center">
      <div className="col p-0 pr-2 m-0">
        <ProfilePicture
          onClick={e => {
            e.preventDefault();
            navigate('/usuarios/' + usuarioId);
          }}
          style={{ height: '45px', width: '45px', borderRadius: '100%' }}
          usuarioId={usuarioId}
        />
      </div>
      <div className="col-md-auto align-self-start p-0 m-0 pr-2">
        <div>{name}</div>
        <div>{new Date(date).toLocaleDateString()}</div>
      </div>
    </div>
  );
}

Box.propTypes = {
  usuarioId: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  src: PropTypes.string,
};

class Votes extends Component {
  constructor(props) {
    super(props);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.editPost = this.editPost.bind(this);
    this.removePost = this.removePost.bind(this);
    this.edit = this.edit.bind(this);
  }
  upVote(e) {
    e.preventDefault();
    this.props.upVote({ id: this.props.post._id });
  }
  downVote(e) {
    e.preventDefault();
    this.props.downVote({ id: this.props.post._id });
  }
  editPost(e) {
    e.preventDefault();
    this.props.editPost();
  }
  removePost(e) {
    e.preventDefault();

    return this.props.removePost({ id: this.props.post._id }).then(resp => {
      const { __v, ...response } = resp.elements[0];
      if (this.props.redirect && this.props.post._id === response._id) {
        return navigate(this.props.path);
      }
    });
  }
  edit() {
    if (!this.props.session || !this.props.usuarioId) return '';

    if (this.props.session.usuarioId === this.props.usuarioId) {
      return (
        <li>
          <button onClick={this.editPost} style={{ color: 'black', border: '0', backgroundColor: 'rgba(1,1,1,0)' }}>
            <i className="fas fa-edit" />
          </button>
        </li>
      );
    }
    return '';
  }
  remove() {
    if (!this.props.session || !this.props.usuarioId) return '';
    if (this.props.session.usuarioId === this.props.usuarioId) {
      return (
        <li>
          <button onClick={this.removePost} style={{ color: 'red', border: '0', backgroundColor: 'rgba(1,1,1,0)' }}>
            <i className="fas fa-trash" />
          </button>
        </li>
      );
    }
  }
  renderUpVoteButtons() {
    if (!this.props.session || !this.props.usuarioId) return '';

    return (
      <li>
        <button onClick={this.upVote} style={{ color: 'green', border: '0', backgroundColor: 'rgba(1,1,1,0)' }}>
          <i className="fas fa-thumbs-up" />
        </button>
        {this.props.votes.upvotes}
      </li>
    );
  }
  renderDownVoteButtons() {
    if (!this.props.session || !this.props.usuarioId) return '';
    return (
      <li>
        <button onClick={this.downVote} style={{ color: 'red', border: '0', backgroundColor: 'rgba(1,1,1,0)' }}>
          <i className="fas fa-thumbs-down" />
        </button>
        {this.props.votes.downvotes}
      </li>
    );
  }

  render() {
    return (
      <div style={{ paddingRight: '10px' }}>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {this.renderUpVoteButtons()}
          {this.renderDownVoteButtons()}
          {this.edit()}
          {this.remove()}
        </ul>
      </div>
    );
  }
}
Votes.defaultProps = {
  votes: {
    upvotes: 0,
    downvotes: 0,
  },
};
Votes.propTypes = {
  redirect: PropTypes.bool,
  path: PropTypes.string,
  post: PropTypes.object,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  editPost: PropTypes.func,
  removePost: PropTypes.func,
  session: PropTypes.object,
  usuarioId: PropTypes.string,
  votes: PropTypes.object,
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      titulo: '',
      descricao: '',
    };
    this.onEdit = this.onEdit.bind(this);
    this.startEdit = this.startEdit.bind(this);
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
            {this.props.titulo ? (
              <div className="pb-2">
                <input
                  className="form-control"
                  name="titulo"
                  onChange={this.onEdit}
                  type="text"
                  value={this.state.titulo}
                />
              </div>
            ) : (
              ''
            )}
            {this.props.post.descricao ? (
              <div className="pb-2">
                <input
                  className="form-control"
                  name="descricao"
                  onChange={this.onEdit}
                  type="text"
                  value={this.state.descricao}
                />
              </div>
            ) : (
              ''
            )}
            <button style={{ float: 'right' }} className="btn btn-success" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
  renderPost() {
    const { post, titulo } = this.props;
    return (
      <div style={{ overflow: 'hidden' }}>
        {titulo ? <h3>{titulo}</h3> : ''}
        {post.descricao ? <h5>{post.descricao}</h5> : ''}
      </div>
    );
  }
  renderBody() {
    if (this.state.editing) {
      return this.renderEdit();
    }
    return this.renderPost();
  }
  startEdit() {
    this.setState({ editing: true, titulo: this.props.titulo, descricao: this.props.post.descricao });
  }
  render() {
    const { post, user, votes } = this.props;
    return (
      <div className="row p-0 m-0">
        <div className="col-md-auto p-0 m-0">
          <Votes
            session={this.props.session}
            usuarioId={user._id}
            post={post}
            upVote={this.props.upVote}
            downVote={this.props.downVote}
            editPost={this.startEdit}
            removePost={this.props.removePost}
            votes={votes}
            redirect={this.props.redirect}
            path={this.props.path}
          />
        </div>
        <div className="col p-0 m-0 align-self-start">{this.renderBody()}</div>
        <div className="col-md-auto p-0 m-0">
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
};

export default connect(
  state => {
    return {
      session: getSession(state),
    };
  },
  {}
)(Post);
