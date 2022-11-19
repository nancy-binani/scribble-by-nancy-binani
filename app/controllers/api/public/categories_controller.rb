# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  def index
    @categories = current_user.categories.order(:position).select { |category| category.articles.count > 1 }
  end
end
