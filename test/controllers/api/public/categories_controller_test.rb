# frozen_string_literal: true

require "test_helper"

class Api::Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = User.create(username: "Oliver Smith", email: "oliver@example.com", site: @site)
    @category = Category.create({ category: "General", position: 1, user: @user })
  end

  def test_should_show_all_categories
    get api_admin_categories_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].length, Category.count
  end
end
