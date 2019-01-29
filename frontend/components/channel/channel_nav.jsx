import React from 'react';
import { requestChannels, createChannel } from "../../actions/channel_actions";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import ChannelNavItem from './channel_nav_item';
import { openModal } from '../../actions/modal_actions';

class ChannelNav extends React.Component {

  componentDidMount() {
    this.props.requestChannels();
  }
  
  render() {
    const channels = this.props.channels.map(channel => {
      return(<ChannelNavItem key={channel.id} channel={channel} />)
    })

    return (
      <div className="channel-nav-container">
        <div className="menu">
          <div className="logo-name"> 6lack
            <i className="fas fa-angle-down"></i>
          </div>
          <div className="current-user">
            <p className="online-dot"></p>
            <p>{this.props.currentUser.username}</p>
          </div>
        </div>

        <img src={this.props.currentUser.avatar} alt="user's avatar" height=".875em" width=".875em"/>
        <button className="logout" onClick={this.props.logout}>Log Out</button>

        <div className="channel-names">
          <div>
            <h4>Channels</h4>
            <p onClick={() => this.props.openModal('newChannel')} className="plus-circle">⊕</p>
          </div>
          <ul>
            {channels}
          </ul>
        </div>
        
        <div className="add-channel-button">
          <i className="fas fa-plus"></i> Add a channel
        </div>

        <div className="direct-messages">
          <div>
              <h4>Direct Messages</h4>
              <p className="plus-circle">⊕</p>
          </div>
        </div>

      </div>
    )
  }
}


const mapStateToProps = ({ session, entities: { users, channels } }) => {
  let allChannels = Object.values(channels);
  return {
    currentUser: users[session.id],
    channels: allChannels,
  };
};

const mapDispatchToProps = dispatch => ({
  requestChannels: () => dispatch(requestChannels()),
  createChannel: (channel) => dispatch(createChannel(channel)),
  logout: () => dispatch(logoutUser()),
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelNav);