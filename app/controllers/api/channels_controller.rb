class Api::ChannelsController < ApplicationController 
  
  def index
    @channels = Channel.all
  end

  def show
    @channel = Channel.find(params[:id])
  end

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