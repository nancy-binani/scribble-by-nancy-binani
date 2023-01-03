# frozen_string_literal: true

class User < ApplicationRecord
  has_many :categories
  has_many :articles
  has_one_attached :report
  belongs_to :site
end
