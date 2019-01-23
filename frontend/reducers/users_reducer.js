import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash';

export const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.currentUser.id]: action.currentUser })
    default:
      return state;
  }
}