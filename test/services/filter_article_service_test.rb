# frozen_string_literal: true

require "test_helper"

class FilterArticleServiceTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_filter_article_by_status
    new_article = create(:article, status: "drafted", category: @category, user: @user)
    new_article.save!
    get api_admin_articles_path, params: { status: "drafted" }
    assert_response :success
    assert_equal response_body["articles"][0]["id"], new_article.id
  end

  def test_filter_article_by_category
    new_category = create(:category, category: "Apps", user: @user)
    new_category.save!
    new_article = create(:article, category: new_category, user: @user)
    get api_admin_articles_path, params: { category_ids: [new_category.id] }
    assert_response :success
    assert_equal response_body["articles"][0]["id"], new_article.id
  end
end
