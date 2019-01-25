class Api::ChannelsController < ApplicationController 
  
  def index
    @channels = Channel.all
  end

  def show
    @channel = Channel.find(params[:id])
    if @channel
      render "api/channels/show"
    else
      render json: ["Channel not found or you do not have access"], status: 401
    end
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      Subscription.create(channel_id: @channel.id, user_id: @channel.creator_id)
      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:title, :description)
  end
end