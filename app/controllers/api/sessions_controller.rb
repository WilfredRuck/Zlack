class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login!(@user)
      redirect_to root_url
    else
      render json: "Wrong username and/or password", status: 401
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