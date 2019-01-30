import { RECEIVE_CHANNEL, RECEIVE_CHANNELS, RECEIVE_CHANNEL_USERS } from '../actions/channel_actions';
import { merge } from 'lodash';

export const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      return merge({}, state, { [action.channel.id]: action.channel });
    case RECEIVE_CHANNEL_USERS:
      return action.users;
    default:
      return state;
  }
}