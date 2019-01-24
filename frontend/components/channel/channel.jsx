import React from 'react';
import { requestChannel, requestChannels } from "../../actions/channel_actions";
import { connect } from 'react-redux';

class Channel extends React.Component {

  componentDidMount() {
    let channelId = this.props.match.params.channelId;
    this.props.requestChannel(channelId);
  }

  render() {

    return (
      <div className="channel-container">
        
        <header className="channel-header">
          <h1>#CHANNEL TITLE</h1>
        </header>

        <div className="chatbox-container">
          <div className="chatbox">
            
          </div>

          <div className="form">
            MESSAGE SUBMISSION FORM WILL GO HERE
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ session, entities: { users, channels } }, ownProps) => {
  let channelId = ownProps.match.params.channelId;
  let channel = channels[channelId];
  return {
    currentUser: users[session.id],
    channel: channel,
  };
};

const mapDispatchToProps = dispatch => ({
  requestChannel: (id) => dispatch(requestChannel(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);