# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @redirection = create(:redirection, site: @site)
  end

  def test_should_get_successfully_from_root_url
    get root_path
    assert_response :success
  end

  def test_should_redirect_from_old_path_to_new_path
    redirection = @site.redirections.create(from: "/1", to: "/2")
    get redirection.from
    assert_response :moved_permanently
    assert_redirected_to redirection.to
  end
end
