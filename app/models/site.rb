# frozen_string_literal: true

class Site < ApplicationRecord
  MIN_PASSWORD_LENGTH = 6
  VALID_PASSWORD_REGEX = /[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/

  has_secure_password
  has_secure_token :authentication_token
  has_many :users
  has_many :redirections
  validates :name, presence: true
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH }, format: { with: VALID_PASSWORD_REGEX }, if: -> {
 password.present? }
end
