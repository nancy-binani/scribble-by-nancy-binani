# frozen_string_literal: true

class Site < ApplicationRecord
  has_secure_password
  enum status: { unchecked: "unchecked", checked: "checked" }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
