import { merge } from 'lodash';
import { RECEIVE_CHANNEL_MESSAGES, RECEIVE_CHANNEL_MESSAGE } from '../actions/message_actions';

export const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL_MESSAGES:
      return action.messages;
    case RECEIVE_CHANNEL_MESSAGE:
      debugger
      return merge({}, state, { [action.message.id]: action.message });
    default:
      return state;
  }
}