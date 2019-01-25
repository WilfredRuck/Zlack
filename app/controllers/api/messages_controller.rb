class Api::MessagesController < ApplicationController

  def index
    @messages = Channel.find(params[:channel_id]).messages
  end
  
  def create
    @message = Message.new(message_params)
    if @message.save
      render "api/messages/index"
    else
      render json: @message.errors.full_messages, status: 401
    end
  end

  private

  def message_params
    params.require(:body)
  end
end