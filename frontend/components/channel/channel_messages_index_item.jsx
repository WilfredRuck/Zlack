import React from 'react';

const ChannelMessagesIndexItem = props => {
  return(
    <li>
      <div className="message-container">
        <img src={props.message.avatar} alt="user's avatar" height="36px" width="36px"/>
        <div>
          <div className="top-of-message">
            <div className="username">{props.message.user}</div> 
            <div className="created-at">{props.message.created}</div>
          </div>
          <div className="message">{props.message.body}</div>
        </div>
      </div>
    </li>
  )
}

export default ChannelMessagesIndexItem;