# frozen_string_literal: true

class Category < ApplicationRecord
  VALID_CATEGORY_REGEX = /\A[a-zA-Z_&_ ]*$\z/

  has_many :articles
  belongs_to :user
  validates :category, uniqueness: true, format: { with: VALID_CATEGORY_REGEX }
  acts_as_list
end
