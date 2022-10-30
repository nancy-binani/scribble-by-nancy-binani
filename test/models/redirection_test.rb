# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @redirection = create(:redirection, assigned_site_id: @site.id)
  end

  def test_oldurl_uniqueness
    new_redirection = @redirection.dup
    assert_not new_redirection.valid?
  end

  def test_single_from_and_to_same_values
    redirection = Redirection.create({ oldurl: "/1", newurl: "/1", assigned_site_id: @site.id })
    assert_not redirection.valid?
 end

  def test_continuous_cyclic_loop
    redirection = Redirection.create({ oldurl: "/1", newurl: "/2", assigned_site_id: @site.id })
    redirection1 = Redirection.create({ oldurl: "/2", newurl: "/3", assigned_site_id: @site.id })
    redirection2 = Redirection.create({ oldurl: "/3", newurl: "/4", assigned_site_id: @site.id })
    redirection3 = Redirection.create({ oldurl: "/4", newurl: "/1", assigned_site_id: @site.id })
    assert_not redirection3.valid?
  end
end
