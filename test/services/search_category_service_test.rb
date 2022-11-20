# frozen_string_literal: true

require "test_helper"

class SearchCategoryServiceTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, category: "General", position: 1, user: @user)
  end

  def test_search_category
    new_category_1 = create(:category, category: "Generalalization", position: 1, user: @user)
    new_category_2 = create(:category, category: "Hello", position: 3, user: @user)
    get api_admin_categories_path, params: { category: "General" }
    assert_response :success
    assert_equal response_body["categories"].length, 2
  end
end
