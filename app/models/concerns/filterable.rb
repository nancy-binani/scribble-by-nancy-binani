# frozen_string_literal: true

module Filterable
  extend ActiveSupport::Concern

  module ClassMethods
    def filter_status(filtering_params)
      articles = Article.where({ status: filtering_params[:status] })
    end

    def filter_by_category(filtering_params)
      selected_categories = Category.where(category: filtering_params[:category])
      articles = Article.where({ category_id: selected_categories })
    end
  end
end
