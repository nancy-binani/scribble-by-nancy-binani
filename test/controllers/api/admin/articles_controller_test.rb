# frozen_string_literal: true

require "test_helper"

class Api::Admin::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_list_all_articles
    get api_admin_articles_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, Article.count
  end

  def test_should_create_valid_article
    post api_admin_articles_path,
      params: {
        article: {
          title: "Scribble", body: "Lorem", status: "published", category_id: @category.id,
          user: @user.id
        }
      }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_filter_article_by_status
    new_article = create(:article, id: 1, status: "draft", category: @category, user: @user)
    new_article.save!
    get api_admin_articles_path, params: { status: "draft" }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"][0]["id"], new_article.id
  end

  def test_article_should_not_be_created_without_title
    @article.title = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, t("article.title_missing_error")
  end

  def test_article_should_not_be_created_without_description
    @article.body = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, t("article.description_missing_error")
  end

  def test_article_should_not_be_created_without_category
    @article.category_id = nil
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, t("missing_category")
  end

  def test_valid_slug
    @article.slug = ""
    assert_not @article.valid?
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete api_admin_article_path(@article.id)
    end
    assert_response :ok
  end

  def test_search_article_title
    new_article = create(:article, title: "Scribble", category: @category, user: @user)
    new_article.save!
    get api_admin_articles_path, params: { title: "Scribble" }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["articles"][0]["id"], new_article.id
  end

  def test_filter_article_by_category
    new_category = create(:category, category: "Apps", user: @user)
    new_category.save!
    new_article = create(:article, category: new_category, user: @user)
    get api_admin_articles_path, params: { category: [new_category.id] }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"][0]["id"], new_article.id
  end

  def test_user_can_update_any_article_fields
    new_title = "ScribbleUpdated"
    article_params = {
      article: {
        title: new_title, category: @category,
        user: @user
      }
    }
    put api_admin_article_path(@article.id), params: article_params
    assert_response :success
    @article.reload
    assert_equal @article.title, new_title
    assert_equal @article.category_id, @category.id
  end

  def test_error_raised_for_duplicate_slug
    another_article = create(:article, category: @category, user: @user)
    assert_raises ActiveRecord::RecordInvalid do
      another_article.update!(slug: @article.slug)
      another_article.reload
    end
    error_msg = another_article.errors.full_messages.to_sentence
    assert_match t("article.slug.immutable"), error_msg
  end

  def test_count
    get count_api_admin_articles_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["count"]["count_by_status"]["all"], 1
    assert_equal response_json["count"]["count_by_category"][@category.id.to_s], 1
    assert_equal response_json["count"]["count_by_status"]["published"], 1
  end
end
