@users.each do |user|
  json.set! user.id do
    json.id user.id
    json.username user.username
    json.avatar user.avatar
    json.chatroom_ids user.chatroom_ids
  end
end