# frozen_string_literal: true

FactoryBot.define do
  factory :site do
    name { Faker::Name.name }
    password { "welcome1" }
    status { "checked" }
  end
end
