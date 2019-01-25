class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: "Wrong email and/or password", status: 401
    end
  end

  def destroy
    if !current_user
      render json: "404 Not Found", status: 404
    else
      logout
      render json: {}
    end
  end

end