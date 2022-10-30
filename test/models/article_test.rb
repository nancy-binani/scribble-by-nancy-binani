# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  MAX_TITLE_LENGTH = 50

  def setup
    @site = create(:site)
    @category = create(:category, assigned_site_id: @site.id)
    @article = create(:article, category_id: @category.id, assigned_site_id: @site.id)
  end

  def test_article_should_not_be_valid_without_category
    @article.assigned_category = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "Assigned category must exist"
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (MAX_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_unique_slug_with_same_title
    article1 = create(:article, category_id: @category.id, assigned_site_id: @site.id)
    article2 = create(:article, category_id: @category.id, assigned_site_id: @site.id)
    assert_not_equal(article1.slug, article2.slug)
  end

  def test_slug_not_generated_on_status_draft
    article = Article.create(
      title: "test1", body: "abc", status: "Draft", category_id: @category.id,
      assigned_site_id: @site.id)
    assert_nil(article.slug, "nil")
  end

  def test_creates_multiple_articles_with_unique_slug
    articles = create_list(:article, 10, category_id: @category.id, assigned_site_id: @site.id)
    slugs = articles.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end
end
