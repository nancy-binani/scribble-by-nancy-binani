# frozen_string_literal: true

class User < ApplicationRecord
  has_many :categories
  has_many :articles
  belongs_to :site
end
