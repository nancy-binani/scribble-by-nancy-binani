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

  def test_cyclic_loop_one
    redirection_1 = Redirection.create(from: "/1", to: "/2", site: @site)
    redirection_2 = Redirection.create(from: "/2", to: "/3", site: @site)
    redirection_3 = Redirection.create(from: "/3", to: "/4", site: @site)
    redirection_4 = Redirection.create(from: "/4", to: "/1", site: @site)
    assert_equal redirection_4.errors.full_messages.to_sentence,
      t("redirection.check_redirection_loop")
  end

  def test_cyclic_loop_two
    redirection_1 = Redirection.create(from: "/1", to: "/2", site: @site)
    redirection_2 = Redirection.create(from: "/1", to: "/3", site: @site)
    assert_not redirection_2.valid?
  end

  def test_non_cyclic_loop
    redirection_1 = Redirection.create!(from: "/3", to: "/2", site: @site)
    redirection_2 = Redirection.create!(from: "/5", to: "/3", site: @site)
    redirection_3 = Redirection.create!(from: "/2", to: "/4", site: @site)
    redirection_4 = Redirection.new(from: "/1", to: "/2", site: @site)
    assert redirection_4.valid?
  end

  def test_to_and_from_equal_redirection_not_possible
    redirection = Redirection.create(to: "/1", from: "/1", site: @site)
    assert_not redirection.valid?
  end
end
