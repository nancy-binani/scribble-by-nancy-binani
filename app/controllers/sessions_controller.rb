# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @site = Site.find_by!(sitename: login_params[:sitename])
    unless @site.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials, try again.", :unauthorized)
    end
  end

  private

    def login_params
      params.require(:login).permit(:sitename, :password)
    end
end
