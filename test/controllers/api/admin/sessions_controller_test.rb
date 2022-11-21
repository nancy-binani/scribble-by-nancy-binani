# frozen_string_literal: true

require "test_helper"

class Api::Admin::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
  end

  def test_should_login_user_with_valid_credentials
    post api_admin_session_path, params: { login: { name: @site.name, password: @site.password } }, as: :json
    assert_response :success
    assert_equal response_body["authentication_token"], @site.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post api_admin_session_path, params: { login: { name: @site.name, password: "invalid password" } },
      as: :json
    assert_response :unauthorized
    assert_equal response_body["error"], t("session.incorrect_credentials")
  end

  def test_when_user_enters_password
    post api_admin_session_path, params: { login: { name: @site.name, password: @site.password } }, as: :json
    get api_public_categories_path
    assert_response :success
  end
end
