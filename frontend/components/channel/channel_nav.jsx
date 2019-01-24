import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';

const ChannelNav = ({ currentUser, logout }) => {
  return (
      <div className="channel-nav-container">
        <button className="logout" onClick={logout}>Log Out</button>
        <div className="current-user">
          <p className="online-dot"></p>
          <p>{currentUser.username}</p>
        </div>
      </div>
  )
}



const mapStateToProps = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelNav);