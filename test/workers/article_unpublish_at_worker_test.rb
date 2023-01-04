# frozen_string_literal: true

require "test_helper"

class ArticleUnpublishAtWorkerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_update_the_article_status_to_draft
    article_schedule_publish_later = ArticleUnpublishAtService.new(@article)
    article_schedule_publish_later.process
    @article.reload
    assert_equal @article.status, "draft"
  end
end
