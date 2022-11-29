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
    moved_articles = MoveArticlesService.new(@user, [new_article_one.id, new_article_two.id], new_category.id).process
    assert_equal new_category.articles, moved_articles
  end
end
