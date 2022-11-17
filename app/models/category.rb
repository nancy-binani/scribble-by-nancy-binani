# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles
  belongs_to :user
  validates :category, uniqueness: true
  acts_as_list
end
