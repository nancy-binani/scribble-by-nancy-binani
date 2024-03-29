# frozen_string_literal: true

require "test_helper"

class Api::Admin::SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_can_update_site
    name = "Spinkart"
    put api_admin_site_path, params: { site: { name: "Spinkart" } }
    assert_response :success
    @site.reload
    assert_equal @site.name, name
  end
end
