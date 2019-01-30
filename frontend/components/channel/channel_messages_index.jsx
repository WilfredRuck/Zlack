import React from 'react'
import ChannelMessagesIndexItem from './channel_messages_index_item';

class ChannelMessagesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.bottom = React.createRef();
  }
  
  componentDidMount() {
    let that = this;
    App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: () => {
          that.props.requestMessages(that.props.channelId);
        },
        speak: function(data) {
          return this.perform("speak", data);
        }
      }
    );

    this.scrollToBottom();
  }
    
    componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const chatbox = document.querySelector('.chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
    setTimeout(function () {
      const chatbox = document.querySelector('.chatbox');
      chatbox.scrollTop = chatbox.scrollHeight;
    }, 0);
  }

  render() {
    debugger
    const messages = this.props.messages.map(message => {
      return(<ChannelMessagesIndexItem key={message.id} message={message}/>)
    })

    return (
      <div className="chatbox">
        <ul>
          {messages}
        </ul>
        <div ref={this.bottom}></div>
      </div>
    )
  }
  
}

export default ChannelMessagesIndex;