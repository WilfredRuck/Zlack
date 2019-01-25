import React from 'react';
import { requestChannel } from '../../actions/channel_actions';
import { requestChannelMessages } from '../../actions/message_actions'
import { connect } from 'react-redux';

class Channel extends React.Component {

  componentDidMount() {
    let channelId = this.props.match.params.channelId;
    this.props.requestChannel(channelId);
    this.props.requestMessages(channelId);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.params.channelId != this.props.match.params.channelId) {
      let channelId = this.props.match.params.channelId;
      this.props.requestChannel(channelId);
      this.props.requestMessages(channelId);
    }
  }

  render() {
    const messages = this.props.messages.map(message => {
      return(
        <li key={message.id}>
          <div className="message-container">
            <img src={message.avatar} alt="user's avatar" height="36px" width="36px"/>
            <div>
              <div className="top-of-message">
                <div className="username">{message.user}</div> 
                <div className="created-at">{message.created}</div>
              </div>
               <div className="message">{message.body}</div>
            </div>
          </div>
        </li>
      )
    })

    return (
      <div className="channel-container">
        
        <header className="channel-header">
          <h1>Channel Title</h1>
        </header>

        <div className="chatbox-container">
          <div className="chatbox">
            <ul>
              {messages}
            </ul>
          </div>

          <div className="chatbox-form">
            <form>
              <input
                type="text"
                placeholder="Message"
              
              />
            </form>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ session, entities: { users, channels, messages } }, ownProps) => {
  let channelId = ownProps.match.params.channelId;
  let channel = channels[channelId];
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