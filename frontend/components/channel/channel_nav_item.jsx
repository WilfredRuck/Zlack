import React from 'react';
import { Link } from 'react-router-dom';

const ChannelNavItem = props => {
  return (
    <Link to={`/channels/${props.channel.id}`}>
      <div> <i className="fas fa-hashtag"></i>  {props.channel.title} </div> 
    </Link>
  )
}

export default ChannelNavItem