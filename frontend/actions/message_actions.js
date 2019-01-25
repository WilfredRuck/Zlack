import * as ChannelApiUtil from "../util/channel_api_util";
export const RECEIVE_CHANNEL_MESSAGES = 'RECEIVE_CHANNEL_MESSAGES'; 

const receiveChannelMessages = messages => ({
  type: RECEIVE_CHANNEL_MESSAGES,
  messages,
})

export const requestChannelMessages = (channelId) => dispatch => {
  return ChannelApiUtil.fetchChannelMessages(channelId).then(messages => {
    return dispatch(receiveChannelMessages(messages))
  })
}