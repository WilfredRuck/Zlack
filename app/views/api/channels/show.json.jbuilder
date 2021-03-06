json.channel do
    json.set! @channel.id do
        json.extract! @channel, :id, :title, :description
        json.created @channel.created_at.strftime("%B %d, %Y")
        json.private @channel.is_private
        json.direct @channel.is_direct
        json.memberIds @channel.member_ids
        json.messageIds @channel.message_ids
        json.creator User.find(@channel.creator_id).username
    end
end

json.members do 
    @channel.members.each do |member|
        json.set! member.id do 
            json.id member.id
            json.username member.username 
            json.avatar member.avatar
            json.chatroom_ids member.chatroom_ids
        end
    end
end

if @messages
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
end