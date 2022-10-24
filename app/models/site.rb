# frozen_string_literal: true

class Site < ApplicationRecord
  has_secure_password
  has_secure_token :authentication_token
  has_many :assigned_categories, foreign_key: :assigned_site_id, class_name: "Category"
  has_many :assigned_redirections, foreign_key: :assigned_site_id, class_name: "Redirection"
  has_many :assigned_articles, foreign_key: :assigned_site_id, class_name: "Article"
  enum status: { unchecked: "unchecked", checked: "checked" }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
