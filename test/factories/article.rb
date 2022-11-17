# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { "hello" }
    body { Faker::Lorem.paragraph }
    category { Faker::Name.name }
    status { "published" }
  end
end
