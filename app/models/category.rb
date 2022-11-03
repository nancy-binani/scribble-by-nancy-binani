# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles
  belongs_to :user
  validates :category, uniqueness: true
  enum status: { checked: "checked", unchecked: "unchecked" }
  acts_as_list
end
