export const fetchChannels = () => {
  return $.ajax({
    method: "GET",
    url: "api/channels"
  })
}

export const fetchChannel = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/channels/${id}`
  })
}

export const fetchChannelUsers = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/channels/${id}/users`
  })
}

export const fetchChannelMessages = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/channels/${id}/messages`
  })
}

export const postChannelMessage = (message) => {
  return $.ajax({
    method: "POST",
    url: `api/messages`,
    data: { message }
  })
}