# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @redirection = create(:redirection, site: @site)
  end

  def test_url_uniqueness
    new_redirection = @redirection.dup
    assert_not new_redirection.valid?
  end

  def test_cyclic_loop
    redirection_1 = Redirection.create(to: "/1", from: "/2", site: @site)
    redirection_2 = Redirection.create(to: "/2", from: "/3", site: @site)
    redirection_3 = Redirection.create(to: "/3", from: "/4", site: @site)
    redirection_4 = Redirection.create(to: "/4", from: "/1", site: @site)
    assert_equal redirection_4.errors.full_messages.to_sentence,
      t("redirection.check_redirection_loop")
  end

  def test_non_cyclic_loop
    redirection_1 = Redirection.create!(to: "/3", from: "/2", site: @site)
    redirection_2 = Redirection.create!(to: "/5", from: "/3", site: @site)
    redirection_3 = Redirection.create!(to: "/2", from: "/4", site: @site)
    redirection_4 = Redirection.new(to: "/1", from: "/2", site: @site)
    assert_equal redirection_4.save, true
  end

  def test_to_and_from_equal_redirection_not_possible
    redirection = Redirection.create(to: "/1", from: "/1", site: @site)
    assert_not redirection.valid?
  end
end
