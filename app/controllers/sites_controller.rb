# frozen_string_literal: true

class SitesController < ApplicationController
  before_action :load_site!, only: %i[ show update ]

  def index
    sites = Site.all
    respond_with_json({ sites: sites })
  end

  def update
    @site.update!(site_params)
    respond_with_success("Site was successfully updated!")
  end

  def show
    site = Site.find_by!(id: params[:id])
    render status: :ok, json: { site: site }
  end

  def create
    site = Site.new(site_params)
    site.save!
    respond_with_success("Site Details was successfully created!")
  end

  private

    def load_site!
      @site = Site.find_by(id: params[:id])
    end

    def site_params
      params.require(:site).permit(:sitename, :password, :checked)
    end
end
