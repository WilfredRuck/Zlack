import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions';
import { RECEIVE_CHANNEL } from '../actions/channel_actions';
import { merge } from 'lodash';

export const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.currentUser.id]: action.currentUser })
    case RECEIVE_CHANNEL:
      return merge({}, state, action.members);
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}