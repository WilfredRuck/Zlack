import * as ChannelApiUtil from "../util/channel_api_util";

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNEL_USERS = 'RECEIVE_CHANNEL_USERS';

const receiveChannels = channels => {
  return {
  type: RECEIVE_CHANNELS,
  channels,
  }
}

const receiveChannel = ({channel, members, messages}) => ({
  type: RECEIVE_CHANNEL,
  channel,
  members,
  messages,
})

const receiveChannelUsers = users => ({
  type: RECEIVE_CHANNEL_USERS,
  users,
})

export const requestChannels = () => dispatch => {
  return ChannelApiUtil.fetchChannels().then(channels => {
    return dispatch(receiveChannels(channels))
  })
}

export const requestChannel = (id) => dispatch => (
  ChannelApiUtil.fetchChannel(id).then(channel => dispatch(receiveChannel(channel)))
)

export const createChannel = (channel) => dispatch => {
  ChannelApiUtil.postChannel(channel).then(channel => dispatch(receiveChannel(channel)))
}

export const requestChannelUsers = (id) => dispatch => {
  ChannelApiUtil.fetchChannelUsers(id).then(users => dispatch(receiveChannelUsers(users)))
}