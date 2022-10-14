# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :assigned_articles, foreign_key: :category_id, class_name: "Article"
end
