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
    assert_equal response_body["articles"].length, Article.count
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
    assert_equal response_body["notice"], t("successfully_created", entity: "Article")
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
    assert_equal response_body["articles"][0]["id"], new_article.id
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
    assert_equal response_body["count"]["count_by_status"]["all"], 1
    assert_equal response_body["count"]["count_by_category"][@category.id.to_s], 1
    assert_equal response_body["count"]["count_by_status"]["published"], 1
  end

  def test_can_update_position_on_sort
    new_article = create(:article, title: "Scribble", category: @category, user: @user)
    article_params = { article: { position: 1, id: new_article.id } }
    put update_with_position_api_admin_articles_path({ params: article_params, id: new_article.id })
    assert_response :success
    @article.reload
    assert_equal @article.position, 2
  end

  def test_get_versions
    get versions_api_admin_article_path(@article.id)
    assert_response :success
    versions_count = @article.versions.count
    response_json = response.parsed_body
    assert_equal versions_count, response_json["article_versions"].count
  end

  def test_update_article_on_visits
    assert_equal @article.visits_count, 0
    put update_visits_count_api_admin_article_path(@article.id)
    @article.reload
    assert_equal @article.visits_count, 1
  end

  def test_restoration_of_an_article_with_valid_version
    new_title_1 = "ScribbleUpdated"
    article_params = {
      article: {
        title: new_title_1, category: @category,
        user: @user
      }
    }
    put api_admin_article_path(@article.id), params: article_params
    @article.reload
    assert_response :success

    new_title_2 = "ScribbleUpdatedNew"
    article_params = {
      article: {
        title: new_title_2, category: @category,
        user: @user
      }
    }
    put api_admin_article_path(@article.id), params: article_params
    assert_response :success
    @article.reload
    v = @article.versions.second
    article_params_new = {
      article: {
        title: v.object["title"],
        body: v.object["body"],
        status: "draft",
        restored: true,
        restored_at: v.object["updated_at"],
        scheduled_publish: nil,
        scheduled_unpublish: nil,
        category: @category,
        user: @user
      }
    }
    put api_admin_article_path(v.object["id"]), params: article_params_new
    @article.reload
    assert_response :success
    assert_equal @article.title, "hello"
  end
end
