import React from 'react';
import { requestChannel, requestChannels } from "../../actions/channel_actions";
import { connect } from 'react-redux';

class Channel extends React.Component {

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
      <div className="channel-container">
        
        <header className="channel-header">
          <h1>#CHANNEL TITLE</h1>
        </header>

        <div className="chatbox-container">
          <div className="chatbox">
            <ul>
              {channels}
            </ul>
          </div>

          <div className="form">
            MESSAGE SUBMISSION FORM WILL GO HERE
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
  requestChannel: (id) => dispatch(requestChannel(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);