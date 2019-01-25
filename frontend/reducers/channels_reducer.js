import { RECEIVE_CHANNEL, RECEIVE_CHANNELS } from '../actions/channel_actions';
import { merge } from 'lodash';

export const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      return merge({}, state, { [action.channel.id]: action.channel });
    default:
      return state;
  }
}