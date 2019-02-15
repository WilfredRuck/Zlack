import React from 'react';
import ChannelMessagesIndex from './channel_messages_index';
import ChannelForm from './channel_form';
import ChannelNav from './channel_nav';
import { Link } from 'react-router-dom';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amountOfMembers: this.props.channel.memberIds.length }
  }

  componentDidMount() {
    let channelId = this.props.match.params.channelId;
    this.props.requestChannel(channelId);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.params.channelId != this.props.match.params.channelId) {
      let channelId = this.props.match.params.channelId;
      this.props.requestChannel(channelId);
    }
  }

  closeSidebar() {
    document.getElementsByClassName("channel-sidebar-info-container")[0].style.width = "0%";
  }

  openSidebar() {
    document.getElementsByClassName("channel-sidebar-info-container")[0].style.width = "25%";
  }

  render() {
    const members = this.props.members.map(member => {
      return(
      <li key={member.id}>
      <p className="online-dot"></p>
      <img src={member.avatar} alt="user's avatar" height="25px" width="25px"/>
      {member.username}
      </li>
      )
    })

    let description = "";
    let deleteChannelButton = "";
    if (this.props.currentUser.username === this.props.channel.creator) {
      description = <p onClick={() => this.props.openModal("editChannel")} className="edit-channel">{this.props.channel.description}</p>;
      if (this.props.channel.id !== 1) {
        deleteChannelButton = <Link to="/channels/1" onClick={() => this.props.deleteChannel(this.props.channel.id)}>Delete channel</Link>
      }
    }
    else {
      description = <p>{this.props.channel.description}</p>;
    }
    let currentChannelTitle = this.props.channel.title;
    if (this.props.channel.direct) {
      if ((this.props.channel.title).includes(this.props.currentUser.username)) {
        const newTitle = this.props.channel.title.split(" ").filter(e => e !== this.props.currentUser.username);
        currentChannelTitle = newTitle.join(" ");
      }
    }

    return (
      <div className="main-container">
        <ChannelNav />
        <div className="channel-container">
          
          <header className="channel-header">
            <div className="channel-info">
              <h1>#{currentChannelTitle}</h1>
              <span>
                <a onClick={this.openSidebar} className="channel-detail-button">
                  <i className="far fa-user"></i> {this.props.channel.memberIds.length}
                </a>|
                <p>{this.props.channel.description}</p>
              </span>
            </div>

          </header>

          <div className="chatbox-container">
            <div className="chatbox-index-form">
              <ChannelMessagesIndex
                messages={this.props.messages}
                createMessage = {this.props.createMessage}
                channelId = {this.props.match.params.channelId}
                requestMessages = {this.props.requestMessages}
              />
              <ChannelForm
                channelId = {this.props.match.params.channelId}
                currentUser = {this.props.currentUser}
                createMessage = {this.props.createMessage}
              />
            </div>
          </div>
        </div>
        <div className="channel-sidebar-info-container">
              <div className="channel-sidebar-info">
                
                <div className="title-section">
                  <div>About #{currentChannelTitle}</div>
                  <div onClick={this.closeSidebar}>X</div>
                </div>

                <div className="details-section">
                  <div>Channel Details {deleteChannelButton}</div>
                  <div>
                    <p>Purpose</p>
                    {description}
                  </div>
                  <div>
                    <p>Created</p>
                    <p>Created by {this.props.channel.creator} on {this.props.channel.created}</p>
                  </div>
                </div>

                <div className="members-section">
                  <div>{this.props.channel.memberIds.length} Members</div>
                  <ul>
                    {members}
                  </ul>
                </div>


              </div>
        </div>
      </div>
    )
  }
}

export default Channel;