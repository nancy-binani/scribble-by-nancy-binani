# frozen_string_literal: true

require "test_helper"

class SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
  end

  def test_can_update_site
    sitename = "Spinkart"
    put site_path, params: { site: { sitename: "Spinkart" } }
    assert_response :success
    @site.reload
    assert_equal @site.sitename, sitename
  end

  def test_should_list_site
    get site_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["sites"].length, Site.count
  end

  def test_should_create_valid_site
    post site_path,
      params: { site: { sitename: "Spinkart", password: "welcome1", status: "checked" } }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Site")
  end
end
