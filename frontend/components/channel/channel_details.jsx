import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

class ChannelDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  
    const users = this.props.users.map(user => {
      return(<li key={user.id}>{user.username}</li>)
    })

    return (
      <div className="channel-info-background" onClick={() => this.props.closeModal()}>
        <div className="channel-info-child" onClick={e => e.stopPropagation()}>
          <div>CHANNEL DETAILS</div>
          <ul>
            {users}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  let channelId = ownProps.match.params.channelId;
  let channel = state.entities.channels[channelId] || { memberIds: [] };
  let allUsers = [];
  channel.memberIds.forEach(id => {
    if (state.entities.users[id]) {
      allUsers.push(state.entities.users[id]);
    }
  })

  return {
    channel: channel,
    users: allUsers,
  };
}

const mapDispatchToProps = dispatch => {
  return ({
    closeModal: () => dispatch(closeModal()),
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelDetails));