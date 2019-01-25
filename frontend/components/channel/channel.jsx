import React from 'react';
import { requestChannel } from '../../actions/channel_actions';
import { requestChannelMessages } from '../../actions/message_actions'
import { connect } from 'react-redux';

class Channel extends React.Component {

  componentDidMount() {
    // let channelId = this.props.match.params.channelId;
    this.props.requestChannel(1);
    this.props.requestMessages(1);
  }

  render() {
    const messages = this.props.messages.map(message => {
      return(
        <li key={message.id}> <img src={message.avatar} alt="user's avatar" height="2%" width="2%"/>{message.user}: {message.body} </li>
      )
    })

    return (
      <div className="channel-container">
        
        <header className="channel-header">
          {/* <h1>{this.props.currentUser.username}</h1> */}
          <h1>App Academy 2019</h1>
        </header>

        <div className="chatbox-container">
          <div className="chatbox">
            <ul>
              {messages}
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

const mapStateToProps = ({ session, entities: { users, channels, messages } }, ownProps) => {
  // let channelId = ownProps.match.params.channelId;
  let channel = channels[1];
  let allMessages = Object.values(messages);
  return {
    currentUser: users[session.id],
    channel: channel,
    messages: allMessages,
  };
};

const mapDispatchToProps = dispatch => ({
  requestChannel: (id) => dispatch(requestChannel(id)),
  requestMessages: (id) => dispatch(requestChannelMessages(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);