# frozen_string_literal: true

class Api::Admin::RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[ update destroy ]
  before_action :current_site

  def index
    redirections = current_site.redirections.all
    respond_with_json(redirections: redirections)
  end

  def create
    redirection = current_site.redirections.create!(redirection_params)
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_deleted", entity: "Redirection"))
  end

  private

    def load_redirection!
      @redirection = current_site.redirections.find(params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:to, :from)
    end
end
