# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
  end

  def test_category_should_not_be_valid_without_user
    @category.user_id = nil
    assert_not @category.save
    assert_equal @category.errors_to_sentence, t("missing_user")
  end

  def test_no_two_categories_must_have_same_name
    new_category = Category.create(category: @category.category, user: @user)
    assert_equal new_category.errors_to_sentence, t("unique", entity: "Category")
  end
end
