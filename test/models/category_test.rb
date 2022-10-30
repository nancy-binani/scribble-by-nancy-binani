# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @category = create(:category, assigned_site_id: @site.id)
    @article = create(:article, category_id: @category.id, assigned_site_id: @site.id)
  end

  def test_category_should_not_be_valid_without_site
    @category.assigned_site_id = nil
    assert_not @category.save
    assert_includes @category.errors.full_messages, "Assigned site must exist"
  end
end
