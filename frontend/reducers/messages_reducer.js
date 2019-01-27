import { merge } from 'lodash';
import { RECEIVE_CHANNEL_MESSAGES, RECEIVE_CHANNEL_MESSAGE } from '../actions/message_actions';

export const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL_MESSAGES:
      return action.messages;
    case RECEIVE_CHANNEL_MESSAGE:
      const messageArray = Object.values(action.message);
      const newMessage = messageArray.slice(messageArray.length - 1);
      const newState = Object.assign({}, state, { [newMessage[0].id]: newMessage[0] });
      return newState;
    default:
      return state;
  }
}