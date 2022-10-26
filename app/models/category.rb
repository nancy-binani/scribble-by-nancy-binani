# frozen_string_literal: true

class Category < ApplicationRecord
  before_destroy :update_articles_category
  has_many :assigned_articles, foreign_key: :category_id, class_name: "Article"
  belongs_to :assigned_site, foreign_key: :assigned_site_id, class_name: "Site"

  acts_as_list

  def update_articles_category
    self.assigned_articles.update_all({ category_id: 9 })
  end
end
