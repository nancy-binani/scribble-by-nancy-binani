# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  MAX_TITLE_LENGTH = 255

  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil
    assert_not @article.save
    assert_equal @article.errors_to_sentence, t("missing_category")
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (MAX_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_password_should_not_have_special_characters
    @article.title = "//"
    assert @article.invalid?
  end

  def test_unique_slug_with_same_title
    new_article_1 = create(:article, category: @category, user: @user)
    new_article_2 = create(:article, category: @category, user: @user)
    assert_not_equal(new_article_1.slug, new_article_2.slug)
  end

  def test_slug_not_generated_on_status_draft
    article = create(:article, title: "test1", body: "abc", status: "draft", category: @category, user: @user)
    assert_nil(article.slug, "nil")
  end

  def test_creates_multiple_articles_with_unique_slug
    articles = create_list(:article, 5, category: @category, user: @user)
    slugs = articles.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end
end
