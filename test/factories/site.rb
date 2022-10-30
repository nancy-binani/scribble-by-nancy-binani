# frozen_string_literal: true

FactoryBot.define do
  factory :site do
    sitename { Faker::Name.name }
    password { Faker::Internet.password }
    status { "checked" }
  end
end
