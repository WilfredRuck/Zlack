import React from "react";
import { connect } from "react-redux";
import { createChannel, requestUsers, requestChannels, createChannelSubscription } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

class NewDirectMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: `${this.props.currentUser.username}`,
      description: '',
      is_direct: true,
      creator_id: this.props.currentUser.id,
      memberIds: [],
      searchName: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  componentDidMount() {
    this.props.requestUsers();
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === 27) {
      this.props.closeModal();
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  handleSubmit(e) {
    if (e.target.disabled) return;
    e.preventDefault();
    this.props.closeModal();
    let that = this;
    let exist = false;
    let newChannelTitle = that.state.title.split(" ").sort();
    this.props.channels.forEach(channel => {
      let storedChannelTitle = channel.title.split(" ").sort();
      if (storedChannelTitle.every(function(value, index) { return value === newChannelTitle[index]})) {
        exist = true;
        that.props.subscribeToChannel(channel.id);
        that.props.history.push(`/channels/${channel.id}`);
      };
    });
    if (!exist) {
      const channel = Object.assign({}, this.state);
      this.props.createChannel(channel).then((response) => {
        this.props.history.push(`/channels/${Object.values(response.channel)[0].id}`);
      });
    }
  }

  addUserToDM(user) {
    if (this.state.memberIds.includes(user.id)) {
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
    let allMembers = [];
    this.state.memberIds.forEach(id => {
        allMembers.push(this.props.users[id - 1]);
    });

    const selectedUsers = allMembers.map(user => {
      return(
      <li className="selectedUser" key={user.id} onClick={() => this.removeUserFromDM(user)}>
        <img src={user.avatar} alt="user's avatar" height="20px" width="20px"/>
        <p>{user.username}</p>
      </li>
      )
    })

    let users;
    if (this.state.searchName === '') {
      users = this.props.users.map(user => {
      if (user.id !== this.props.currentUser.id) {
        return(
        <li key={user.id} onClick={() => this.addUserToDM(user)}>
          <img src={user.avatar} alt="user's avatar" height="36px" width="36px"/>
          <p>{user.username}</p>
        </li>
        )
      }
      })
    }
    else {
      users = this.props.users.map(user => {
        if (user.id !== this.props.currentUser.id) {
          if (user.username.toUpperCase().includes(this.state.searchName.toUpperCase())) {
            return(
            <li key={user.id} onClick={() => this.addUserToDM(user)}>
              <img src={user.avatar} alt="user's avatar" height="36px" width="36px"/>
              <p>{user.username}</p>
            </li>
            )
          }
        }
      })
    }
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
                <form className="new-dm-form form-buttons" onSubmit={this.handleSubmit}>

                  <input 
                    type="search" 
                    value={this.state.searchName}
                    onChange={this.update('searchName')}
                    placeholder="Find or start a conversation"
                  />

                  <input 
                    type="submit"
                    disabled={!(this.state.memberIds.length !== 0)}
                    value="Go"
                    className={`${!(this.state.memberIds.length !== 0)}`}
                  />

                </form>
                <ul className="selectedUsers">
                  {selectedUsers}
                </ul>
                <ul className="selectUsers">
                  {users}
                </ul>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  const users = Object.values(state.entities.users);
  const currentUser = state.entities.users[state.session.id]
  const allChannels = Object.values(state.entities.channels);
  const channels = []
  allChannels.forEach(channel => {
    if (channel.direct && channel.title.includes(currentUser.username)) channels.push(channel);
  })
  return ({
    currentUser: currentUser,
    users: users,
    channels: channels,
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    requestChannels: () => dispatch(requestChannels()),
    createChannel: channel => dispatch(createChannel(channel)),
    requestUsers: () => dispatch(requestUsers()),
    closeModal: () => dispatch(closeModal()),
    subscribeToChannel: (id) => dispatch(createChannelSubscription(id)),
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewDirectMessage));