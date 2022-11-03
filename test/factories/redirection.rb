# frozen_string_literal: true

FactoryBot.define do
   factory :redirection do
     from { Faker::Internet.url(host: "localhost:3000/abc") }
     to { Faker::Internet.url(host: "localhost:3000/abcdef") }
   end
 end
