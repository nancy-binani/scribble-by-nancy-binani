# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[ show edit update destroy ]

  def index
    redirections = Redirection.all
    render status: :ok, json: { redirections: redirections }
  end

  def create
    redirection = Redirection.new(redirection_params)
    redirection.save!
    respond_with_success("Redirection was successfully created")
  end

  def show
    redirection = Redirection.find_by(id: params[:id])
    render status: :ok, json: { redirection: redirection }
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success("Redirection was successfully updated!")
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
