# frozen_string_literal: true

require "test_helper"

class ArticlePublishLaterWorkerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_update_the_article_status_to_published
    article_schedule_publish_later = ArticlePublishLaterService.new(@article)
    article_schedule_publish_later.process
    @article.reload
    assert_equal @article.status, "published"
  end
end
