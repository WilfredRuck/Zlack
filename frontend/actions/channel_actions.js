import * as ChannelApiUtil from "../util/channel_api_util";
import * as SubscriptionApiUtil from "../util/subscription_api_util";

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_CHANNEL_USERS = 'RECEIVE_CHANNEL_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

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

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users,
})

const removeChannel = ({channel}) => {
  return {
    type: REMOVE_CHANNEL,
    channelId: Object.values(channel)[0].id,
  }
}

export const requestChannels = () => dispatch => {
  return ChannelApiUtil.fetchChannels().then(channels => {
    return dispatch(receiveChannels(channels))
  })
}

export const requestChannel = (id) => dispatch => (
  ChannelApiUtil.fetchChannel(id).then(channel => dispatch(receiveChannel(channel)))
)

export const createChannel = (channel) => dispatch => {
  return (ChannelApiUtil.postChannel(channel).then(channel => {
    return (dispatch(receiveChannel(channel)))
  }));
}

export const updateChannel = (channel) => dispatch => {
  ChannelApiUtil.updateChannel(channel).then(channel => dispatch(receiveChannel(channel)))
}

export const destroyChannel = (id) => dispatch => {
  ChannelApiUtil.destroyChannel(id).then(channel => dispatch(removeChannel(channel)))
}

export const requestChannelUsers = (id) => dispatch => {
  ChannelApiUtil.fetchChannelUsers(id).then(users => dispatch(receiveChannelUsers(users)))
}

export const requestUsers = () => dispatch => {
  ChannelApiUtil.fetchUsers().then(users => dispatch(receiveUsers(users)))
}

export const createChannelSubscription = (channelId) => dispatch => {
  SubscriptionApiUtil.createSubscription(channelId).then(channel => dispatch(receiveChannel(channel)))
}

export const deleteChannelSubscription = (channelId) => dispatch => {
  SubscriptionApiUtil.destroySubscription(channelId).then(channels => dispatch(receiveChannels(channels)))
}