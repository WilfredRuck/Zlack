import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { requestChannelUsers } from '../../actions/channel_actions';
import { withRouter } from 'react-router-dom';
import { postUser } from '../../util/session_api_util';

class ChannelUserModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let channelId = this.props.match.params.channelId;
    this.props.requestChannelUsers(channelId);
  }

  render() {    
    const user = this.props.users.find(user => {
      return (user.id === this.props.modalData.id)
    });
    return (
      <div className="user-modal-background" onClick={() => this.props.closeModal()}>
        <div className="user-modal-child" onClick={e => e.stopPropagation()}>
          <div className="user-menu-container">  
              <ul className="user-menu">
                <li className="user-info">
                  <div>
                    <img src={user.avatar} alt="user's avatar" height="200px" width="100%"/>
                  </div>
                </li>
                <li>
                  {user.username}
                </li> 
              </ul>
            </div>
          </div>
      </div>
    )
  }

}

const mapStateToProps = ({entities: { users } }) => {
  const allUsers = Object.values(users);
  return ({
    users: allUsers,
  })
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    requestChannelUsers: (id) => dispatch(requestChannelUsers(id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelUserModal));