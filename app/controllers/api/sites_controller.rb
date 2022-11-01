# frozen_string_literal: true

class Api::SitesController < ApplicationController
  def show
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
    site = Site.first
    site.update!(site_params)
    respond_with_success(t("successfully_updated", entity: "Site"))
  end

  private

    def site_params
      params.require(:site).permit(:sitename, :password, :status)
    end
end
