class Api::UsersController < ApplicationController

  def index
    channel_user_ids = Subscription.where(channel_id: params[:channel_id]).pluck(:user_id)
    @users = User.where(id: channel_user_ids)
  end

  def all_users_index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      Subscription.create(channel_id: Channel.first.id, user_id: @user.id)
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :avatar)
  end
end