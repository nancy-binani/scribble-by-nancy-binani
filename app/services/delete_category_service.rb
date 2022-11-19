# frozen_string_literal: true

class DeleteCategoryService
  attr_reader :params, :current_user

  def initialize(params, category, current_user)
    @category = category
    @params = params
    @current_user = current_user
  end

  def when_single_category_present_is_general
    category = @current_user.categories.create!({ category: "General" })
    new_category_id = category.id
    new_category_id
  end

  def when_single_category_is_present
    if @category.category != "General"
      new_category_id = when_single_category_present_is_general
    else
      category = @current_user.categories.create!({ category: "Getting Started" })
      new_category_id = category.id
    end
    new_category_id
  end

  def process
    if @current_user.categories.count === 1
      new_category_id = when_single_category_is_present
    elsif @current_user.categories.count > 1
      new_category_id = params[1].to_i
    end
    @category.articles.update(category_id: new_category_id)
    @category.destroy!
  end
end
