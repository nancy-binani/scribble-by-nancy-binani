# frozen_string_literal: true

class Category < ApplicationRecord
  REGEX = /\A[a-zA-Z_&_ ]*$\z/

  has_many :articles
  belongs_to :user
  validates :category, uniqueness: true, format: { with: REGEX }
  acts_as_list
end
