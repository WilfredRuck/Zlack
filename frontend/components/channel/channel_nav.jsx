import React from 'react';
import { requestChannel, requestChannels } from "../../actions/channel_actions";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';

class ChannelNav extends React.Component {

  componentDidMount() {
    this.props.requestChannels();
  }
  
  render() {
    
    const channels = this.props.channels.map(channel => {
      return(
        <div key={channel.id}> {channel.title} <p>{channel.description}</p> </div>
      )
    })

    return (
      <div className="channel-nav-container">
        <button className="logout" onClick={this.props.logout}>Log Out</button>
        <div className="current-user">
          <p className="online-dot"></p>
          <p>{this.props.currentUser.username}</p>
        </div>
        <div className="channel-names">
          <ul>
            {channels}
          </ul>
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
  logout: () => dispatch(logoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelNav);