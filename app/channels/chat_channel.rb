class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'chat_channel'
  end

  def speak(data)
    message = Message.create(body: data['message']['body'], channel_id: data['message']['channel_id'], author_id: data['message']['author_id'])
    Subscription.create(channel_id: data['message']['channel_id'], user_id: data['message']['author_id'])
    socket = { message: message.body }
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

end
