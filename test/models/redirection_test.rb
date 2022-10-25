# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
  end

  def test_oldurl_uniqueness
    new_redirection = @redirection.dup
    assert_not new_redirection.valid?
  end

  def test_single_from_and_to_same_values
    redirection = Redirection.create({ oldurl: "/1", newurl: "/1" })
    assert_not redirection.valid?
 end

  def test_continuous_cyclic_loop
    redirection = Redirection.create({ oldurl: "/1", newurl: "/2" })
    redirection1 = Redirection.create({ oldurl: "/2", newurl: "/3" })
    redirection2 = Redirection.create({ oldurl: "/3", newurl: "/4" })
    redirection3 = Redirection.create({ oldurl: "/4", newurl: "/1" })
    assert_not redirection3.valid?
  end
end
