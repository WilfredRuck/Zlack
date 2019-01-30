json.messages do
  @messages.each do |message|
    json.set! message.id do
      json.id message.id
      json.body message.body
      json.userId message.author_id
      json.user message.user.username
      json.avatar message.user.avatar
      json.channelId message.channel_id
      json.created message.created_at
    end
  end
end

json.channel do
  json.set! @channel.id do
    json.id @channel.id
    json.messageIds @channel.message_ids
  end
end