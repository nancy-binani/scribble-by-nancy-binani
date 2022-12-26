# frozen_string_literal: true

module SampleData
  class ArticlesService < Base
    ARTICLES_COUNT = 2

    def process!
      create_articles!
    end

    private

      def create_articles!
        Category.all.each do |category|
          ARTICLES_COUNT.times do
            current_user.articles.create!(
              title: Faker::Alphanumeric.alpha(number: 5),
              body: Faker::Lorem.paragraph,
              status: "draft",
              author: "Oliver Smith",
              user_id: current_user.id,
              category_id: category.id
            )
          end
          ARTICLES_COUNT.times do
            current_user.articles.create!(
              title: Faker::Alphanumeric.alpha(number: 5),
              body: Faker::Lorem.paragraph,
              status: "published",
              author: "Oliver Smith",
              user_id: current_user.id,
              category_id: category.id
            )
          end
        end
      end
  end
end
