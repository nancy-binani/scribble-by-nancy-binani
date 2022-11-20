# frozen_string_literal: true

require "test_helper"

class Api::Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
  end

  def test_should_list_all_categories
    get api_admin_categories_path
    assert_response :success
    assert_equal response_body["categories"].length, Category.count
  end
end
