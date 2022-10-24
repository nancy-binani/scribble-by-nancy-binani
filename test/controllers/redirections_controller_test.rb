# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @redirection = create(:redirection)
  end

  def test_should_create_valid_redirection
    post redirections_path,
      params: { redirection: { oldurl: "managecategories", newurl: "manage" } }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Redirection")
  end

  def test_should_show_all_redirections
    get redirections_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["redirections"].length, Redirection.count
 end

  def test_can_update_redirection
    oldurl = "#{@redirection.oldurl}/abc"
    newurl = "#{@redirection.newurl}/abc"
    redirection_params = { redirection: { oldurl: oldurl, newurl: newurl } }

    put redirection_path(@redirection.id), params: redirection_params
    assert_response :success
    @redirection.reload
    assert_equal @redirection.oldurl, oldurl
    assert_equal @redirection.newurl, newurl
  end

  def test_should_destroy_redirection
    assert_difference "Redirection.count", -1 do
      delete redirection_path(@redirection.id)
    end
    assert_response :ok
  end
end
