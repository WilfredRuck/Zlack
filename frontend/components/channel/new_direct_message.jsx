import React from "react";
import { connect } from "react-redux";
import { createChannel, requestUsers } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';

class NewDirectMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentUser.username,
      description: '',
      is_direct: true,
      creator_id: this.props.currentUser.id,
      memberIds: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.requestUsers();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  handleSubmit(e) {
    if (e.target.disabled) {
      return;
    }
    this.props.closeModal();
    e.preventDefault();
    const channel = Object.assign({}, this.state);
    this.props.createChannel(channel);
  }

  addUserToDM(user) {
    if (this.state.title.split(" ").includes(user.username)) {
      this.removeUserFromDM(user);
    }
    else {
      let updatedUsernames = this.state.title.concat(" " + user.username);
      let updatedIds = this.state.memberIds.concat(user.id);
      return this.setState({
        title: updatedUsernames,
        memberIds: updatedIds
      });
    }
  }

  removeUserFromDM(user) {
    let updatedUsernames = this.state.title.replace(` ${user.username}`, '');
    let updatedIds = this.state.memberIds.filter(id => {
      return (id !== user.id);
    })
    return this.setState({
      title: updatedUsernames,
      memberIds: updatedIds
    });
  }

  render() {
    const users = this.props.users.map(user => {
      if (user.id !== this.props.currentUser.id) {
        return(
        <li key={user.id} onClick={() => this.addUserToDM(user)}>
          <img src={user.avatar} alt="user's avatar" height="36px" width="36px"/>
          <p>{user.username}</p>
        </li>
        )
      }
    })
    return (
      <div className="modal-background">
        <div onClick={() => this.props.closeModal()} className="cancel-modal">
          <p></p>
          <p>esc</p>
        </div>
        <div className="dm-modal-child" onClick={e => e.stopPropagation()}>
          <div className="new-dm-container">  
              <div className="new-dm-form-group">
                <div className="form-title">Direct Messages</div><br/>
                <form className="new-dm-form" onSubmit={this.handleSubmit}>

                  <input 
                    type="search" 
                    placeholder="Find or start a conversation"
                  />

                  <input 
                    type="submit"
                    value="Go"
                  />

                </form>
                <p>{this.state.title}</p>
                <ul>
                  {users}
                </ul>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


const setStateToProps = state => {
  const users = Object.values(state.entities.users);
  return ({
    currentUser: state.entities.users[state.session.id],
    users: users,
  })
}

const setDispatchToProps = dispatch => {
  return ({
    createChannel: channel => dispatch(createChannel(channel)),
    requestUsers: () => dispatch(requestUsers()),
    closeModal: () => dispatch(closeModal()),
  })
}

export default connect(setStateToProps, setDispatchToProps)(NewDirectMessage);