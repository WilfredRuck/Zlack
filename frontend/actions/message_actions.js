import { fetchChannelMessages, postChannelMessage } from "../util/channel_api_util";

export const RECEIVE_CHANNEL_MESSAGES = 'RECEIVE_CHANNEL_MESSAGES'; 
export const RECEIVE_CHANNEL_MESSAGE = 'RECEIVE_CHANNEL_MESSAGE';

const receiveChannelMessages = messages => ({
  type: RECEIVE_CHANNEL_MESSAGES,
  messages,
})

export const receiveChannelMessage = message => {
  return {
    type: RECEIVE_CHANNEL_MESSAGE,
    message,
  }
}

export const requestChannelMessages = channelId => dispatch => {
  return fetchChannelMessages(channelId).then(messages => {
    return dispatch(receiveChannelMessages(messages))
  })
}

export const createMessage = message => dispatch => {
  return postChannelMessage(message).then(message => {
    return dispatch(receiveChannelMessage(message))
  })
}