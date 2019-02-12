@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :title, :description
    json.created channel.created_at
    json.direct channel.is_direct
    json.private channel.is_private
    json.memberIds channel.member_ids
    json.messageIds channel.message_ids
    json.creator User.find(channel.creator_id).username
  end
end