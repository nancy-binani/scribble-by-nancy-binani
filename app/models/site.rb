# frozen_string_literal: true

class Site < ApplicationRecord
  has_secure_password
  has_secure_token :authentication_token
  enum status: { unchecked: "unchecked", checked: "checked" }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
