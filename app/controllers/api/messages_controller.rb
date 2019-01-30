class Api::MessagesController < ApplicationController

  def index
    @channel = Channel.find(params[:channel_id])
    @messages = @channel.messages
  end
  
  # def create
  #   debugger
  #   @message = Message.new(message_params)
  #   if @message.save
  #     Subscription.create(channel_id: @message.channel_id, user_id: current_user.id)
  #     @messages = Channel.find(@message.channel_id).messages
  #     render "api/messages/index"
  #   else
  #     logger.info(@message.errors.full_messages)
  #     render json: "Invalid or empty input", status: 401
  #   end
  # end

  private

  def message_params
    params.require(:message).permit(:body, :channel_id, :author_id)
  end
end