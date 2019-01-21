class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
      # render 'api/users/show'
    else
      logger.info(@user.errors.full_messages)
      render json: @user.errors.full_messages, status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :avatar)
  end
end