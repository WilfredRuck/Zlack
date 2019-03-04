class Api::SubscriptionsController < ApplicationController
  def create
    new_sub = Subscription.new(channel_id: params[:channel_id], user_id: current_user.id)
    new_sub.save
    @channel = Channel.find(params[:channel_id])
    render "api/channels/show"
  end

  def destroy
    oldSub = Subscription.find_by(channel_id: params[:channel_id], user_id: current_user.id)
    oldSub.destroy

    @channels = Channel.all
    render "api/channels/index"
  end
end