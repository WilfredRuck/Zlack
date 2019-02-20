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
    document.getElementsByClassName("info-box")[0].style.background = "#fff";
    const infoButton = document.getElementsByClassName("info-button")[0];
    infoButton.classList.remove('black');
    infoButton.classList.add('grey');
  }
  
  openSidebar() {
    document.getElementsByClassName("channel-sidebar-info-container")[0].style.width = "25%";
    document.getElementsByClassName("info-box")[0].style.background = "#ddd";
    const infoButton = document.getElementsByClassName("info-button")[0];
    infoButton.classList.remove('grey');
    infoButton.classList.add('black');
  }

  toggleChannelInfo() {
    const channelInfo = document.getElementsByClassName("channel-sidebar-info-container")[0];
    if (channelInfo.style.width === "25%" || channelInfo.style.width === "") this.closeSidebar();
    else this.openSidebar();
  }

  toggleChannelDetails() {
    const detailDiv = document.getElementsByClassName("details-info")[0];
    const caret = document.getElementsByClassName("arrow")[0];

    if (detailDiv.style.display === '') {
      detailDiv.style.display = 'none';
      caret.classList.remove('fa-caret-down');
      caret.classList.add('fa-caret-right');
    }
    else {
      detailDiv.style.display = '';
      caret.classList.remove('fa-caret-right');
      caret.classList.add('fa-caret-down');
    }
  }

  toggleChannelMembers() {
    const membersUl = document.getElementsByClassName("members-info")[0];
    const caret = document.getElementsByClassName("arrow")[1];
    
    if (membersUl.style.display === '') {
      membersUl.style.display = 'none';
      caret.classList.remove('fa-caret-down');
      caret.classList.add('fa-caret-right');
    }
    else {
      membersUl.style.display = '';
      caret.classList.remove('fa-caret-right');
      caret.classList.add('fa-caret-down');
    }
  }

  render() {
    const members = this.props.members.map(member => {
      return(
      <li key={member.id} onClick={() => this.props.openModal("userProfile", member)}>
      <p className="online-dot"></p>
      <img src={member.avatar} alt="user's avatar" height="25px" width="25px"/>
      {member.username}
      </li>
      )
    })

    let memberWord = "Member"
    if (this.props.channel.memberIds.length > 1) memberWord = "Members" 
    let description = <p>{this.props.channel.description}</p>;
    let deleteChannelButton = "";
    let created_by = this.props.channel.creator;
    if ((this.props.currentUser.username === this.props.channel.creator) && (this.props.channel.id !== 1)) {
      if (!this.props.channel.direct) {
        description = <p onClick={() => this.props.openModal("editChannel")} className="edit-channel">{this.props.channel.description}</p>;
      }
      deleteChannelButton = <Link to="/channels/1" onClick={() => this.props.deleteChannel(this.props.channel.id)}>
      <button className="delete-button">Delete channel</button>
      </Link>
      created_by = "You";
    }
    
    let currentChannelTitle = <h1>{`# ${this.props.channel.title}`}</h1>;
    let channelInfoTitle = <div> {`About # ${this.props.channel.title}`}</div>;
    if (this.props.channel.direct) {
      if ((this.props.channel.title).includes(this.props.currentUser.username)) {
        const newTitle = this.props.channel.title.split(" ").filter(name => ((name !== this.props.currentUser.username) && (name !== "")));
        currentChannelTitle = <h1>{newTitle.join(", ")}</h1>;
        channelInfoTitle = "About this conversation";
      }
    }
    else if (this.props.channel.private) {
      currentChannelTitle = <h1><i className="fas fa-lock"></i> {this.props.channel.title}</h1>;
      channelInfoTitle = <div>About <i className="fas fa-lock"></i> {this.props.channel.title}</div>;
    }

    return (
      <div className="main-container">
        <ChannelNav />
        <div className="channel-container">
          
          <header className="channel-header">
            <div className="channel-info">
              {currentChannelTitle}
              <span>
                <a onClick={this.openSidebar} className="channel-detail-button">
                  <i className="far fa-user"></i> {this.props.channel.memberIds.length}
                </a>|
                {description}
              </span>
            </div>
            <div className="info-box" onClick={() => this.toggleChannelInfo()}>
              <i className="fas fa-info-circle info-button black"></i>
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
              {channelInfoTitle}
              <div onClick={this.closeSidebar} className="sidebar-close"></div>
            </div>

            <div className="details-section">
              <div onClick={() => this.toggleChannelDetails()} className="toggler">
                <div id="channel-detail"><i className="fas fa-info-circle"></i>Channel Details</div>
                <i className="fas arrow fa-caret-down"></i>
              </div>
              <div className="details-info">
                <div className="description">
                  <p>Purpose</p>
                  {description}
                </div>
                <div className="created-at">
                  <p>Created</p>
                  <p>Created by {created_by} on {this.props.channel.created}</p>
                  {deleteChannelButton}
                </div>
              </div>
            </div>

            <div className="members-section">
              <div onClick={() => this.toggleChannelMembers()} className="toggler">
                <div id="members-detail"><i className="far fa-user"></i> {this.props.channel.memberIds.length} {memberWord}</div>
                <i className="fas arrow fa-caret-down"></i>
              </div>
              <ul className="members-info">
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