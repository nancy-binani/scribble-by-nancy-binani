# frozen_string_literal: true

class SearchCategoryService
  attr_reader :category, :categories

  def initialize(categories, category)
    @categories = categories
    @category = category
  end

  def process
    if category != nil
      @categories = categories.where("lower(category) LIKE ?", "%#{category.downcase}%")
    end
    @categories
  end
end
