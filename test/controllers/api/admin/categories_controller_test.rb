# frozen_string_literal: true

require "test_helper"

class Api::Admin::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, category: "General", position: 1, user: @user)
  end

  def test_should_show_all_categories
    get api_admin_categories_path
    assert_response :success
    assert_equal response_body["categories"].length, Category.count
  end

  def test_should_create_valid_category
    post api_admin_categories_path,
      params: { category: { category: "Apps", position: 2 } }
    assert_response :success
    assert_equal response_body["notice"], t("successfully_created", entity: "Category")
  end

  def test_can_update_category
    new_category = "Apps and Integration"
    category_params = { category: { category: new_category } }
    put api_admin_category_path(@category.id), params: category_params
    assert_response :success
    @category.reload
    assert_equal @category.category, new_category
  end

  def test_should_destroy_category
    new_category = create(:category, user: @user)
    @article = create(:article, category: new_category, user: @user)
    assert_difference "Category.count", -1 do
      delete api_admin_category_path(new_category.id), params: { move_category: [new_category.id, @category.id] }
    end
    assert_response :ok
    assert_equal @category.articles.length, 1
  end

  def test_can_update_position_on_sort
    new_category = create(:category, category: "Apps", position: 2, user: @user)
    category_params = { category: { position: 1, id: new_category.id } }
    put update_with_position_api_admin_categories_path({ params: category_params, id: new_category.id })
    assert_response :success
    @category.reload
    assert_equal @category.position, 2
  end
end
