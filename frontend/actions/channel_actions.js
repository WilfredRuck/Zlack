import * as ChannelApiUtil from "../util/channel_api_util";

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';

const receiveChannels = (channels) => {
  return {
  type: RECEIVE_CHANNELS,
  channels,
  }
}

const receiveChannel = (channel) => ({
  type: RECEIVE_CHANNEL,
  channel,
})

export const requestChannels = () => dispatch => {
  return ChannelApiUtil.fetchChannels().then(channels => {
    return dispatch(receiveChannels(channels))
  })
}

export const requestChannel = (id) => dispatch => (
  ChannelApiUtil.fetchChannel(id).then(channel => dispatch(receiveChannel(channel)))
)