# frozen_string_literal: true

module SampleData
  class CategoriesService < Base
    def process!
      create_categories!
    end

    private

      def create_categories!
        Category.create!(
          category: "General",
          user_id: current_user.id
        )
        Category.create!(
          category: "Security & Privacy",
          user_id: current_user.id
        )
      end
  end
end
