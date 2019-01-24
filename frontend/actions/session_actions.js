import { postUser, postSession, deleteSession } from '../util/session_api_util';

export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveCurrentUser = currentUser => {
  return {
  type: RECEIVE_CURRENT_USER,
  currentUser,
  }
}

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
})

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
})

export const createNewUser = user => dispatch => {
  return postUser(user).then(user => dispatch(receiveCurrentUser(user)), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
}

export const loginUser = user => dispatch => {
  return postSession(user).then(user => dispatch(receiveCurrentUser(user)), err => (
      dispatch(receiveErrors(err.responseJSON))
  ))
}

export const logoutUser = () => dispatch => {
  return deleteSession().then(() => dispatch(logoutCurrentUser()), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
}