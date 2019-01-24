json.extract! @channel, :id, :title, :description
json.extract! @message, :id, :body, :author_id, :channel_id