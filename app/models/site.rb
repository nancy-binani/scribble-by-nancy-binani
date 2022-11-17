# frozen_string_literal: true

class Site < ApplicationRecord
  has_secure_password
  has_secure_token :authentication_token
  has_many :users
  has_many :redirections
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
  enum status: { checked: "checked", unchecked: "unchecked" }
  validates :sitename, presence: true
end
