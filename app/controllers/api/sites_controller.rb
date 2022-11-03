# frozen_string_literal: true

class Api::SitesController < ApplicationController
  before_action :current_site

  def update
    current_site.update!(site_params)
    respond_with_success(t("successfully_updated", entity: "Site"))
  end

  private

    def site_params
      params.require(:site).permit(:sitename, :password, :status)
    end
end
