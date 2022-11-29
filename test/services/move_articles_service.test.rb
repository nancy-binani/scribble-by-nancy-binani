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
    new_category_1 = Category.create(category: "Gen", user: @user)
    new_article_one = create(:article, status: "draft", category: @category, user: @user)
    new_article_two = create(:article, status: "published", category: @category, user: @user)
    assert_equal new_category_1.articles.length, 0
    article_params = { article_ids: [new_article_one.id, new_article_two.id], category_id: new_category_1.id }
    put move_to_category_api_admin_articles_path(params: article_params)
    assert_equal new_category_1.articles.length, 0
  end
end
