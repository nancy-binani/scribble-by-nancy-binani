# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { Faker::Name.name }
    body { Faker::Lorem.paragraph }
    category { Faker::Name.name }
    status { Faker::Name.name }
  end
end
