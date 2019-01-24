class Api::Channels < ApplicationController 
  
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  private

  def channel_params
    params.require(:title)
  end
end