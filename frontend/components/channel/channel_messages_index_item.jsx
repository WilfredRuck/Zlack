import React from 'react';

class ChannelMessagesIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }

  formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  render () {
    const messageTime = this.formatTime(new Date(this.props.message.created));
    return(
      <li>
        <div className="message-container">
          <img src={this.props.message.avatar} alt="user's avatar" height="36px" width="36px"/>
          <div>
            <div className="top-of-message">
              <div className="username">{this.props.message.user}</div> 
              <div className="created-at">{messageTime}</div>
            </div>
            <div className="message">{this.props.message.body}</div>
          </div>
        </div>
      </li>
    )
  }
}

export default ChannelMessagesIndexItem;