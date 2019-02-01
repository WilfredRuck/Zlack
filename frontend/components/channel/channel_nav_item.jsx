import React from 'react';
import { Link } from 'react-router-dom';

const ChannelNavItem = props => {
  if (props.channel.direct)  {
    return (
      <Link to={`/channels/${props.channel.id}`}>
        <div> {props.channel.title} </div> 
      </Link>
    )
  }

  return (
    <Link to={`/channels/${props.channel.id}`}>
      <div> <i className="fas fa-hashtag"></i>  {props.channel.title} </div> 
    </Link>
  )
}

export default ChannelNavItem