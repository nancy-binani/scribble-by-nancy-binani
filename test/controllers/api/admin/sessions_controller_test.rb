# frozen_string_literal: true

require "test_helper"

class Api::Admin::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
  end

  def test_should_login_user_with_valid_credentials
    post api_admin_session_path, params: { login: { sitename: @site.sitename, password: @site.password } },
      as: :json
    assert_response :success
    assert_equal response_body["authentication_token"], @site.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post api_admin_session_path, params: { login: { sitename: @site.sitename, password: "invalid password" } },
      as: :json
    assert_response :unauthorized
    assert_equal response_body["error"], t("session.incorrect_credentials")
  end
end
