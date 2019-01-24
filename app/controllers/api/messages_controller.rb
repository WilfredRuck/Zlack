class Api::Messages < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      render 'app/views/api/channels/show'
    else
      render json: @message.errors.full_messages, status: 401
    end
  end

  private

  def message_params
    params.require(:body)
  end
end