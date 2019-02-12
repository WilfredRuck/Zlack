import React from 'react';
import { Link } from 'react-router-dom';

const ChannelNavItem = props => {
  if (props.channel.direct)  {
    return (
      <Link to={`/channels/${props.channel.id}`}>
        <div className={props.highlighted}> {props.channel.title} </div> 
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