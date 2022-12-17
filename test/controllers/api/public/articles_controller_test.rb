# frozen_string_literal: true

require "test_helper"

class Api::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_list_all_articles
    get api_public_articles_path
    assert_response :success
    assert_equal response_body["articles"].length, Article.count
  end

  def test_update_article_on_visits
    assert_equal @article.visits_count, 0
    put api_public_article_path(@article.id)
    @article.reload
    assert_equal @article.visits_count, 1
  end
end
