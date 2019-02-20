class Api::ChannelsController < ApplicationController 
  
  def index
    @channels = Channel.all
  end

  def show
    @channel = Channel.find(params[:id])
    @all_users = User.all
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
      if(params["channel"]["memberIds"])
        params["channel"]["memberIds"].each do |id|
          Subscription.create(channel_id: @channel.id, user_id: id)
        end
      end
      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy
    render "api/channels/show"
  end

  private

  def channel_params
    params.require(:channel).permit(:title, :description, :creator_id, :is_direct, :is_private, :id, :memberIds)
  end
end