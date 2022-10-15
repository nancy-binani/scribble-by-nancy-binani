# frozen_string_literal: true

class SitedetailsController < ApplicationController
  def create
    site = SiteDetail.new(site_params)
    site.save!
    respond_with_success("Site Details was successfully created!")
  end

  private

    def site_params
      params.require(:site).permit(:sitename, :password, :status)
    end
end
