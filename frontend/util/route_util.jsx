import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn, exact, latestChannel}) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={`/channels/${latestChannel}`} />
    )
  )}/>
);

const Protected = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )}/>
);

const mapStateToProps = ({ session, entities: { users } }) => {
  const currentUser = users[session.id];
  let latest;
  if (currentUser) {
    latest = currentUser.chatroom_ids.slice(currentUser.chatroom_ids.length - 1).toString();
  }
  return ({
    loggedIn: Boolean(session.id),
    latestChannel: latest,
  })
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));