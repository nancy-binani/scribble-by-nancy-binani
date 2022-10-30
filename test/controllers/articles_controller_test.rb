# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @category = create(:category, assigned_site_id: @site.id)
    @article = create(:article, category_id: @category.id, assigned_site_id: @site.id)
  end

  def test_should_list_all_articles
    get articles_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, Article.count
  end

  def test_should_create_valid_article
    post articles_path,
      params: {
        article: {
          title: "NewTitle", body: "Body", status: "Draft", category_id: @category.id,
          assigned_site_id: @site.id
        }
      }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_filter_article_status
    article1 = create(:article, category_id: @category.id, assigned_site_id: @site.id)
    article1.status = "Draft"
    article1.save!
    get "/articles/filter_status", params: { status: "Draft" }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, 1
  end

  def test_filter_article_by_category
    category1 = create(:category, assigned_site_id: @site.id)
    category1.category = "Books"
    category1.save!
    article1 = create(:article, category_id: category1.id, assigned_site_id: @site.id)
    get "/articles/filter_by_category", params: { category: ["Books"] }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["articles"].length, 1
  end

  def test_creator_can_update_any_article_fields
    updated_title = "UpdatedTitle"
    article_params = { article: { title: updated_title, category_id: @category.id, assigned_site_id: @site.id } }
    put article_path(@article.id), params: article_params
    assert_response :success
    @article.reload
    assert_equal @article.title, updated_title
    assert_equal @article.category_id, @category.id
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_article_should_not_be_valid_without_body
    @article.body = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Body can't be blank"
  end

  def test_article_should_not_be_valid_without_category
    @article.category_id = nil
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Assigned category must exist"
  end

  def test_article_should_not_be_valid_without_status
    @article.status = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Status can't be blank"
  end

  def test_valid_slug
    @article.slug = ""
    assert_not @article.valid?
  end

  def test_should_destroy_category
    assert_difference "Article.count", -1 do
      delete article_path(@article.id)
    end
    assert_response :ok
  end
end
