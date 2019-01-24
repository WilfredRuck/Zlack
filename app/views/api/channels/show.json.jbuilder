@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :title
  end
end

json.extract! @channel, :id, :title, :description
json.extract! @message, :id, :body, :author_id, :channel_id