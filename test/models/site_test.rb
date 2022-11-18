# frozen_string_literal: true

require "test_helper"

class SiteTest < ActiveSupport::TestCase
  MIN_PASSWORD_LENGTH = 6
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_site_name_cannot_be_null
    @site.sitename = ""
    assert @site.invalid?
  end

  def test_site_should_not_be_saved_without_password
    @site.password = nil
    assert_not @site.valid?
  end

  def test_Password_should_be_of_valid_length
    @site.password = "a" * (MIN_PASSWORD_LENGTH - 1)
    assert @site.invalid?
  end

  def test_sites_should_have_unique_auth_token
    second_site = create(:site)

    assert_not_same @site.authentication_token,
      second_site.authentication_token
  end
end
