import React from 'react'
import ChannelMessagesIndexItem from './channel_messages_index_item';

class ChannelMessagesIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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

    const messages = this.props.messages.map(message => {
      return(<ChannelMessagesIndexItem key={message.id} message={message}/>)
    })

    return (
      <div className="chatbox">
        <ul>
          {messages}
        </ul>
      </div>
    )
  }
  
}

export default ChannelMessagesIndex;