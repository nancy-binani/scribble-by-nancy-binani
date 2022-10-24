# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[ show update destroy ]
  before_action :set_current_site

  def index
    redirections = Redirection.all
    respond_with_json({ redirections: redirections })
  end

  def create
    redirection = Redirection.create!(redirection_params.merge(assigned_site_id: @current_site.id))
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def show
    respond_with_json({ redirection: @redirection })
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_json
  end

  private

    def load_redirection!
      @redirection = Redirection.find_by(id: params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:oldurl, :newurl)
    end
end
