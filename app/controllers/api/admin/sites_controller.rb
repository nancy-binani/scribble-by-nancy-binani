# frozen_string_literal: true

class Api::Admin::SitesController < ApplicationController
  before_action :current_site

  def update
    current_site.update!(site_params)
    respond_with_success(t("successfully_updated", entity: "Site"))
  end

  private

    def site_params
      params.require(:site).permit(:name, :password, :status)
    end
end
