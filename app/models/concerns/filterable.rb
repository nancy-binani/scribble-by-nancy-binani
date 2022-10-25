# frozen_string_literal: true

module Filterable
  extend ActiveSupport::Concern

  module ClassMethods
    def filter_columns
      column_params = Filter.first.columns
      articles = Article.select(column_params)
      articles
    end

    def filter_status
      status_params = Filter.first.status
      articles = Article.where({ status: status_params })
      articles
    end

    def filter_by_category
      selected_categories = Filter.first.categories
      selected_categories = Category.where(category: selected_categories).select(:id)
      articles = Article.where({ assigned_category_id: selected_categories })
      articles
    end
  end
end
