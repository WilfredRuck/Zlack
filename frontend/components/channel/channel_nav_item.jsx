import React from 'react';
import { Link } from 'react-router-dom';

const ChannelNavItem = props => {
  if (props.channel.direct)  {
    const newTitle = props.channel.title.split(" ").filter(e => e !== props.currentUser.username);
    const currentChannelTitle = newTitle.join(" ");
    return (
      <Link to={`/channels/${props.channel.id}`}>
        <div className={props.highlighted}> {currentChannelTitle} </div>
      </Link>
    )
  }
  else if (props.channel.private) {
    return (
      <Link to={`/channels/${props.channel.id}`}>
        <div className={props.highlighted}> <i className="fas fa-lock"></i>  {props.channel.title} </div> 
      </Link>
    )
  }

  return (
    <Link to={`/channels/${props.channel.id}`}>
      <div className={props.highlighted}> <i className="fas fa-hashtag"></i>  {props.channel.title} </div> 
    </Link>
  )
}

export default ChannelNavItem