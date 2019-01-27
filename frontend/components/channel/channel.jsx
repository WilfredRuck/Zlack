import React from 'react';
import { requestChannel } from '../../actions/channel_actions';
import { requestChannelMessages, createMessage } from '../../actions/message_actions';
import { connect } from 'react-redux';
import ChannelMessagesIndex from './channel_messages_index';
import ChannelForm from './channel_form';

class Channel extends React.Component {
  constructor(props) {
    super(props);
  }

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

    return (
      <div className="channel-container">
        
        <header className="channel-header">
          <h1>Channel Title</h1>
        </header>

        <div className="chatbox-container">
          <ChannelMessagesIndex 
            messages={this.props.messages}
          />
          <ChannelForm
            channelId = {this.props.match.params.channelId}
            currentUser = {this.props.currentUser}
            createMessage = {this.props.createMessage}
          />
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

const mapDispatchToProps = dispatch => {
  return {
    requestChannel: (id) => dispatch(requestChannel(id)),
    requestMessages: (id) => dispatch(requestChannelMessages(id)),
    createMessage: (message) => dispatch(createMessage(message)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);