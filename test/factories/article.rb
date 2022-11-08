# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { "hello" }
    body { Faker::Lorem.paragraph }
    category { Faker::Name.name }
    status { "Published" }
  end
end
