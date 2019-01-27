import React from 'react';
import { requestChannels, createChannel } from "../../actions/channel_actions";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import { Link } from 'react-router-dom';

class ChannelNav extends React.Component {

  componentDidMount() {
    this.props.requestChannels();
  }
  
  render() {
    const channels = this.props.channels.map(channel => {
      return(
        <Link key={channel.id} to={`/channels/${channel.id}`}> <div> <i className="fas fa-hashtag"></i>  {channel.title} </div> </Link>
      )
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

        <button className="logout" onClick={this.props.logout}>Log Out</button>

        <div className="channel-names">
          <div>
            <h4>Channels</h4>
            <p className="plus-circle">⊕</p>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelNav);