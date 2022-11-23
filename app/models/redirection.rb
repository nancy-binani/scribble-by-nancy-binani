# frozen_string_literal: true

class Redirection < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :site
  validates :to, uniqueness: { scope: :from }
  validates :from, uniqueness: { scope: :to }
  validates_with CheckRedirectionLoop
end
