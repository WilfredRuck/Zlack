import { merge } from 'lodash';
import { RECEIVE_CHANNEL_MESSAGES, RECEIVE_CHANNEL_MESSAGE } from '../actions/message_actions';
import { RECEIVE_CHANNEL } from '../actions/channel_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

export const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL_MESSAGES:
    debugger

      return action.messages;
    case RECEIVE_CHANNEL_MESSAGE:
    debugger

      const messageArray = Object.values(action.message);
      const newMessage = messageArray.slice(messageArray.length - 1);
      const newState = Object.assign({}, state, { [newMessage[0].id]: newMessage[0] });
      return newState;
    case RECEIVE_CHANNEL:
    debugger
      return merge({}, state, action.messages);
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}