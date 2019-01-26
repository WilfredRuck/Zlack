import React from 'react';
import { requestChannel } from '../../actions/channel_actions';
import { requestChannelMessages, createMessage } from '../../actions/message_actions';
import { connect } from 'react-redux';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      body: '', 
      channel_id: this.props.match.params.channelId,
      author_id: this.props.currentUser.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let channelId = this.props.match.params.channelId;
    this.props.requestChannel(channelId);
    this.props.requestMessages(channelId);
    this.scrollToBottom();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.params.channelId != this.props.match.params.channelId) {
      let channelId = this.props.match.params.channelId;
      this.props.requestChannel(channelId);
      this.props.requestMessages(channelId);
    }
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

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
      channel_id: this.props.match.params.channelId,
      author_id: this.props.currentUser.id
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = Object.assign({}, this.state);
    this.props.createMessage(message);
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
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Message"
                value={this.state.body}
                onChange={this.update('body')}
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