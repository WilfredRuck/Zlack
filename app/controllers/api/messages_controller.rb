class Api::MessagesController < ApplicationController

  def index
    @channel = Channel.find(params[:channel_id])
    @messages = @channel.messages
  end

  private

  def message_params
    params.require(:message).permit(:body, :channel_id, :author_id)
  end
end