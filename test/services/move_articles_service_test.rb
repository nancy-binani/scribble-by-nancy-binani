# frozen_string_literal: true

require "test_helper"

class MoveArticlesServiceTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_move_articles_to_another_category
    new_category = create(:category, category: "Gen", user: @user)
    new_article_one = create(:article, status: "draft", category: @category, user: @user)
    new_article_two = create(:article, status: "published", category: @category, user: @user)
    put move_to_category_api_admin_articles_path,
      params: { article_ids: [new_article_one.id, new_article_two.id], category_id: new_category.id }
    new_category.reload
    new_article_one.reload
    assert_equal new_article_one.category_id, new_category.id
  end
end
