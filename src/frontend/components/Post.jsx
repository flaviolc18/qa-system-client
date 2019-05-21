import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { getSession } from '../redux/sessions.redux';
import ProfilePicture from './ProfilePicture';

function Box({ usuarioId, name, date }) {
  return (
    <div>
      <div style={{ display: 'inline-box' }}>
        <div>{name}</div>
        <div>{new Date(date).toLocaleDateString()}</div>
      </div>

      <ProfilePicture
        onClick={e => {
          e.preventDefault();
          navigate('/usuarios/' + usuarioId);
        }}
        style={{ display: 'inline-box', height: '70px', width: '70px', borderRadius: '100%' }}
        usuarioId={usuarioId}
      />
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
    this.props.removePost({ id: this.props.post._id }).then(() => {
      if (this.props.redirect) {
        navigate(this.props.path);
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
  render() {
    return (
      <div style={{ paddingRight: '10px' }}>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          <li>
            <button onClick={this.upVote} style={{ color: 'green', border: '0', backgroundColor: 'rgba(1,1,1,0)' }}>
              <i className="fas fa-thumbs-up" />
            </button>
            {this.props.votes.upvotes}
          </li>
          <li>
            <button onClick={this.downVote} style={{ color: 'red', border: '0', backgroundColor: 'rgba(1,1,1,0)' }}>
              <i className="fas fa-thumbs-down" />
            </button>
            {this.props.votes.downvotes}
          </li>
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
      <form onSubmit={this.edit}>
        {this.props.titulo ? (
          <input className="form-control" name="titulo" onChange={this.onEdit} type="text" value={this.state.titulo} />
        ) : (
          ''
        )}
        {this.props.post.descricao ? (
          <input
            className="form-control"
            name="descricao"
            onChange={this.onEdit}
            type="text"
            value={this.state.descricao}
          />
        ) : (
          ''
        )}
        <button className="btn btn-success" type="submit">
          Update
        </button>
      </form>
    );
  }
  renderPost() {
    const { post, titulo } = this.props;
    return (
      <div style={{ float: 'left' }}>
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
      <div>
        <div style={{ float: 'left' }}>
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
        {this.renderBody()}
        <div style={{ float: 'right' }}>
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
