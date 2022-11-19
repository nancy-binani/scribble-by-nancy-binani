# frozen_string_literal: true

class Api::Admin::SessionsController < ApplicationController
  def create
    unless current_site.authenticate(login_params[:password])
      respond_with_error(t("session.incorrect_credentials"), :unauthorized)
    end
  end

  private

    def login_params
      params.require(:login).permit(:sitename, :password)
    end
end
