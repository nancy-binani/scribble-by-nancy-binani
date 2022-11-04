# frozen_string_literal: true

require "test_helper"

class DeleteCategoryServiceTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = User.create(username: "Oliver Smith", email: "oliver@example.com", site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_single_category_deletion
    delete api_category_path(@category.id), params: { category: @category.id }
    assert_equal Category.first.category, "General"
    assert_equal Category.first.articles.length, 1
  end

  def test_single_category_general_deletion
    newcategory = "General"
    category_params = { category: { category: newcategory } }
    put api_category_path(@category.id), params: category_params
    assert_response :success
    @category.reload
    delete api_category_path(@category.id), params: { category: @category.id }
    assert_equal Category.first.category, "Getting Started"
    assert_equal Category.first.articles.length, 1
  end
end