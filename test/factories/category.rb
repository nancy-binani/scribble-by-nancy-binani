# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    category { ["General"] }
    position { Faker::Number.between(from: 1, to: 157) }
  end
end
