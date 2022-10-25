# frozen_string_literal: true

require "test_helper"

class SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
  end

  def test_can_update_site
    sitename = "Scribble"
    password = "welcome1"
    site_params = { site: { sitename: sitename, password: password } }
    put site_path(@site.id), params: site_params
  end
end
