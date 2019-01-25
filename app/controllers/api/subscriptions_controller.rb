class Api::SubscriptionsController < ApplicationController
  def create
    new_sub = Subscription.new(channel_id: params[:channel_id], user_id: current_user.id)
    if new_sub.save
      @channel = Channel.find(params[:channel_id])
      render "api/channels/show"
    else
      render json: new_sub.errors.full_messages, status: 422
    end

  end

  def destroy
    oldSub = Subscription.find_by(channel_id: params[:channel_id], user_id: current_user.id)
    oldSub.destroy

    @channels = Channel.all
    render "api/channels/index"
  end
end