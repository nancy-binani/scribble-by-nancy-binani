# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @redirection = create(:redirection, site: @site)
  end

  # def test_should_get_successfully_from_root_url
  #   get @redirection.from
  #   assert_redirected_to @redirection.to
  #   get root_path
  #   assert_response :success
  # end
end
