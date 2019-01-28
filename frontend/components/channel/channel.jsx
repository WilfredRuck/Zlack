import React from 'react';
import { withRouter } from 'react-router-dom';
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
          <h1>{this.props.channel.title}</h1>
        </header>

        <div className="chatbox-container">
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
    )
  }
}

export default withRouter(Channel);