# frozen_string_literal: true

require "test_helper"

class Api::Admin::RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @redirection = create(:redirection, site: @site)
  end

  def test_should_list_all_redirections
    get api_admin_redirections_path
    assert_response :success
    assert_equal response_body["redirections"].length, Redirection.count
  end

  def test_should_create_valid_redirection
    post api_admin_redirections_path,
      params: { redirection: { to: "abc", from: "myabc" } }
    assert_response :success
    assert_equal response_body["notice"], t("successfully_created", entity: "Redirection")
  end

  def test_can_update_redirection
    to = "#{@redirection.to}/1"
    from = "#{@redirection.from}/1"
    redirection_params = { redirection: { to: to, from: from } }
    put api_admin_redirection_path(@redirection.id), params: redirection_params
    assert_response :success
    @redirection.reload
    assert_equal @redirection.to, to
    assert_equal @redirection.from, from
  end

  def test_should_destroy_redirection
    assert_difference "Redirection.count", -1 do
      delete api_admin_redirection_path(@redirection.id)
    end
    assert_response :ok
  end
end
