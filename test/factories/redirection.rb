# frozen_string_literal: true

FactoryBot.define do
   factory :redirection do
     oldurl { Faker::Internet.url(host: "localhost:3000/abc") }
     newurl { Faker::Internet.url(host: "localhost:3000/abcdef") }
   end
 end
