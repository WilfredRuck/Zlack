import React from "react";
import { connect } from "react-redux";
import { createChannel, requestUsers } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

class ChannelNewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      is_private: false,
      memberIds: [],
      creator_id: this.props.currentUser.id 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
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
    if (e.target.disabled) {
      return;
    }
    this.props.closeModal();
    e.preventDefault();
    const channel = Object.assign({}, this.state);
    this.props.createChannel(channel).then((response) => {
      this.props.history.push(`/channels/${Object.values(response.channel)[0].id}`);
    });
  }

  changeStatus() {
    this.setState({
      is_private: !(this.state.is_private)
    })
  }

  addUserToChannel(user) {
    if (this.state.memberIds.includes(user.id)) {
      this.removeUserFromChannel(user);
    }
    else {
      let updatedIds = this.state.memberIds.concat(user.id);
      return this.setState({
        memberIds: updatedIds
      });
    }
  }

  removeUserFromChannel(user) {
    let updatedIds = this.state.memberIds.filter(id => {
      return (id !== user.id);
    })
    return this.setState({
      memberIds: updatedIds
    });
  }

  render() {
    let statusMessage = <span>Public - Anyone in your workspace can view and join this channel.</span>
    let status = "Public";
    let channeltype = <div className="form-title">Create a channel</div>
    if (this.state.is_private) {
      statusMessage = <span>Private - This channel can only be joined or viewed by invite</span>;
      channeltype = <div className="form-title">Create a private channel</div>;
      status = "Private";
    }

    let allMembers = [];
    this.state.memberIds.forEach(id => {
        allMembers.push(this.props.users[id - 1]);
    });

    const selectedUsers = allMembers.map(user => {
        return(
        <li key={user.id} onClick={() => this.removeUserFromChannel(user)}>
          <img src={user.avatar} alt="user's avatar" height="20px" width="20px"/>
          <p>{user.username}</p>
        </li>
        )
    })

    const users = this.props.users.map(user => {
      if (user.id !== this.props.currentUser.id) {
        return(
        <li key={user.id} onClick={() => this.addUserToChannel(user)}>
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
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          <div className="new-channel-container">  
              <div className="new-channel-form">
                {channeltype}<br/>
                <div className="form-description">Channels are where your members communicate. They’re best when organized around a topic — #leads, for example.</div><br/>
                <form onSubmit={this.handleSubmit}>

                    <button type="button" className={`private-button-${this.state.is_private}`} onClick={() => this.changeStatus()}>{status}</button>
                    {statusMessage}

                  <label>Name <br/>
                    <input 
                      type="text" 
                      placeholder="# e.g. leads"
                      value={this.state.title}
                      onChange={this.update('title')}
                    />
                  </label>
                  <p>Names must be lowercase, without spaces or periods, and shorter than 22 characters.</p>

                  <label>Purpose <p className="dim">(optional)</p>
                    <input 
                      type="text"
                      value={this.state.description}
                      onChange={this.update('description')}
                    />
                  </label>
                    <p> What's this channel about?</p>
                  <label>Send Invites to: <p className="dim">(optional)</p></label>
                  <ul className="selectedUsers">
                    {selectedUsers}
                  </ul>
                  <ul className="selectUsers">
                    {users}
                  </ul>

                  <div className="form-buttons">
                    <input 
                      type="button" 
                      value="Cancel"
                      onClick={() => this.props.closeModal()}
                    />
                    <input 
                      type="submit"
                      disabled={!this.state.title}
                      value="Create Channel"
                      className={`${!this.state.title}`}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


const mapStateToProps = ({ session, entities: { users } }) => {
  const allUsers = Object.values(users);
  return ({
    currentUser: users[session.id],
    users: allUsers,
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    createChannel: channel => dispatch(createChannel(channel)),
    requestUsers: () => dispatch(requestUsers()),
    closeModal: () => dispatch(closeModal())
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelNewModal));