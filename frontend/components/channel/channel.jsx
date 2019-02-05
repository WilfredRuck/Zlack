import React from 'react';
import { withRouter } from 'react-router-dom';
import ChannelMessagesIndex from './channel_messages_index';
import ChannelForm from './channel_form';
import ChannelNav from './channel_nav';

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
    return (
      <div className="main-container">
        <ChannelNav />
        <div className="channel-container">
          
          <header className="channel-header">
            <div className="channel-info">
              <h1>#{this.props.channel.title}</h1>
              <span>
                <a onClick={() => this.props.openModal('channelInfo')} className="channel-detail-button">
                  <i className="far fa-user"></i> {this.props.channel.memberIds.length}
                </a>|
                <p>{this.props.channel.description}</p>
              </span>
            </div>
            <div className="channel-search">
              <form action="">
                <input type="search" placeholder="Search" disabled={true}/>
              </form>
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
                  <div>About #{this.props.channel.title}</div>
                  <div>X</div>
                </div>

                <div className="details-section">
                  <div>Channel Details</div>
                  <div>
                    <p>Purpose</p>
                    <p>{this.props.channel.description}</p>
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

export default withRouter(Channel);