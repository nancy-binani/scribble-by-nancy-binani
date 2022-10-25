# frozen_string_literal: true

class SitesController < ApplicationController
  before_action :load_site!, only: %i[ show update update_status]

  def index
    sites = Site.all.as_json(
      include: {
        assigned_articles: { only: %i[title body created_at] },
        assigned_categories: { only: %i[category position] }, assigned_redirections: { only: %i[oldurl newurl] }
      })
    respond_with_json({ sites: sites })
  end

  def create
    site = Site.create!(site_params)
    respond_with_success(t("successfully_created", entity: "Site"))
  end

  def update
    site = Site.find_by!(id: site_params[:id]).update!(site_status_update_params)
    respond_with_success(t("successfully_updated", entity: "Site"))
  end

  def update_status
    site = Site.find_by(id: site_status_update_params[:id]).update!(site_status_update_params)
    respond_with_success(t("successfully_updated", entity: "Site"))
  end

  def show
    render status: :ok, json: { site: site }
  end

  private

    def load_site!
      @site = Site.find_by(id: params[:id])
    end

    def site_params
      params.require(:site).permit(:sitename, :password, :checked, :id)
    end

    def site_status_update_params
      params.require(:site).permit(:sitename, :checked)
    end
end
