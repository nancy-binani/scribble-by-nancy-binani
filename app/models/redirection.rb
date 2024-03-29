# frozen_string_literal: true

class Redirection < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :site
  validates :from, uniqueness: true
  validates :to, uniqueness: { scope: :from }
  validates_with CheckRedirectionLoop
end
