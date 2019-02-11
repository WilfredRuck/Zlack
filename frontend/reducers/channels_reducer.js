import { RECEIVE_CHANNEL, RECEIVE_CHANNELS, REMOVE_CHANNEL } from '../actions/channel_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_CHANNEL_MESSAGES } from '../actions/message_actions';
import { merge } from 'lodash';

export const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      return merge({}, state, action.channel);
    case LOGOUT_CURRENT_USER:
      return {};
    case RECEIVE_CHANNEL_MESSAGES:
      return merge({}, state, action.channel);
    case REMOVE_CHANNEL:
      let newState = merge({}, state);
      delete newState[action.channelId]
      return newState;
    default:
      return state;
  }
}