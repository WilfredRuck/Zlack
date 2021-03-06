import React from 'react';
import { requestChannels, createChannel, destroyChannel } from "../../actions/channel_actions";
import { connect } from 'react-redux';
import ChannelNavItem from './channel_nav_item';
import { openModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

class ChannelNav extends React.Component {

  componentDidMount() {
    this.props.requestChannels();
  }
  
  render() {
    let currentChannel = this.props.match.params.channelId;
    const channels = this.props.channels.map(channel => {
      let highlighted = "not-highlighted";
      if (!channel.direct && !channel.private) {
        if (channel.id == currentChannel) highlighted = "highlighted"; 
        return(<ChannelNavItem key={channel.id} channel={channel} highlighted={highlighted} />)
      }
      else if ((channel.private) && (channel.memberIds.includes(this.props.currentUser.id))) {
        if (channel.id == currentChannel) highlighted = "highlighted"; 
        return(<ChannelNavItem key={channel.id} channel={channel} highlighted={highlighted} />)
      }
    })
    
    const dms = this.props.channels.map(channel => {
      let highlighted = "not-highlighted";
      if ((channel.direct) && (channel.memberIds.includes(this.props.currentUser.id))) {
        if (channel.id == currentChannel) highlighted = "highlighted";
        return(
          <ChannelNavItem 
            key={channel.id} 
            channel={channel} 
            highlighted={highlighted} 
            currentUser={this.props.currentUser} 
            deleteChannel={this.props.deleteChannel}
            currentChannel={this.props.currentChannel}
          />
        )
      }
    })

    return (
      <div className="channel-nav-container">
        <div className="menu" onClick={() => this.props.openModal('navMenu')}>
          <div className="logo-name"> 6lack
            <i className="fas fa-angle-down"></i>
          </div>
          <div className="current-user">
            <p className="online-dot"></p>
            <p>{this.props.currentUser.username}</p>
          </div>
        </div>

        <div className="channel-names">
          <div>
            <h4 onClick={() => this.props.openModal('newChannel')}>Channels</h4>
            <p onClick={() => this.props.openModal('newChannel')} className="plus-circle">⊕</p>
          </div>
          <ul>
            {channels}
          </ul>
        </div>

        <div className="direct-messages">
          <div>
              <h4 onClick={() => this.props.openModal('channelDM')}>Direct Messages</h4>
              <p onClick={() => this.props.openModal('channelDM')} className="plus-circle">⊕</p>
          </div>
          <ul>
            {dms}
          </ul>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ session, entities: { users, channels } }, ownProps) => {
  let channelId = ownProps.match.params.channelId;
  let channel = channels[channelId];
  let allChannels = Object.values(channels);
  return {
    currentUser: users[session.id],
    channels: allChannels,
    currentChannel: channel,
  };
};

const mapDispatchToProps = dispatch => ({
  requestChannels: () => dispatch(requestChannels()),
  createChannel: (channel) => dispatch(createChannel(channel)),
  openModal: modal => dispatch(openModal(modal)),
  deleteChannel: (id) => dispatch(destroyChannel(id)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelNav));