import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { deleteChannelSubscription } from '../../actions/channel_actions';
import { connect } from 'react-redux';

class ChannelNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleUnsubscribe(e, channel) {
    e.stopPropagation();
    this.props.unsubscribeChannel(channel.id);
    if (this.props.currentChannel.id === channel.id) {
      this.props.history.push(`/channels/1`);
    }
  }

  handleSwitch(id) {
    this.props.history.push(`/channels/${id}`);
  }

  render() {
    if (this.props.channel.direct)  {
      const newTitle = this.props.channel.title.split(" ").filter(name => ((name !== this.props.currentUser.username) && (name !== "")));
      const currentChannelTitle = newTitle.join(", ");

      return (
        <a id="cursor" onClick={() => this.handleSwitch(this.props.channel.id)} to={`/channels/${this.props.channel.id}`}>
          <div className={this.props.highlighted}> {currentChannelTitle} 
            <i onClick={(e) => this.handleUnsubscribe(e, this.props.channel)} className="far fa-times-circle"></i>
          </div>
        </a>
      )
    }
    else if (this.props.channel.private) {
      return (
        <Link to={`/channels/${this.props.channel.id}`}>
          <div className={this.props.highlighted}> <i className="fas fa-lock"></i>  {this.props.channel.title} </div> 
        </Link>
      )
    }

    return (
      <Link to={`/channels/${this.props.channel.id}`}>
        <div className={this.props.highlighted}> <i className="fas fa-hashtag"></i>  {this.props.channel.title} </div> 
      </Link>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    unsubscribeChannel: (id) => dispatch(deleteChannelSubscription(id)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(ChannelNavItem));

