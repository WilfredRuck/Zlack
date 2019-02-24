import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { logoutUser } from '../../actions/session_actions';

const ChannelNavMenu = (props) => {
  return (
    <div className="nav-modal-background" onClick={() => props.closeModal()}>
        <div className="nav-modal-child">
          <div className="nav-menu-container" onClick={e => e.stopPropagation()}>  
              <ul className="nav-menu">
                <li className="user-info">
                  <div>
                    <img src={props.currentUser.avatar} alt="user's avatar" height="36px" width="36px"/>
                    <p>{props.currentUser.username}</p>
                  </div>
                </li>  
                <li onClick={() => {props.logout(); props.closeModal();}} className="logout-button">Sign out of 6lack</li>  
              </ul>
            </div>
          </div>
      </div>
  )
}

const mapStateToProps = ({ session, entities: {users} }) => {
  return ({
    currentUser: users[session.id],
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    closeModal: () => dispatch(closeModal()),
    logout: () => dispatch(logoutUser()),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNavMenu);