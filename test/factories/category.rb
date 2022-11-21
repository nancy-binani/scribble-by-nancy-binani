# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    category { "Hello" }
    position { Faker::Number.between(from: 1, to: 157) }
  end
end
