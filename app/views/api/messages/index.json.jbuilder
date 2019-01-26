@messages.each do |message|
  json.set! message.id do
    json.id message.id
    json.body message.body
    json.userId message.author_id
    json.user message.user.username
    json.avatar message.user.avatar
    json.channelId message.channel_id
    json.created message.created_at.strftime("%d %b %Y")
  end
end