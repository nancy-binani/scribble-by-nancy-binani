# frozen_string_literal: true

require "test_helper"

class Api::Admin::SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = User.create(username: "Oliver Smith", email: "oliver@example.com", site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_can_update_site
    sitename = "Spinkart"
    put api_admin_site_path, params: { site: { sitename: "Spinkart" } }
    assert_response :success
    @site.reload
    assert_equal @site.sitename, sitename
  end
end
