# frozen_string_literal: true

module SampleData
  class UserService < Base
    USER_NAME = "Oliver Smith"
    USER_EMAIL = "oliver@example.com"

    attr_reader :user_name, :current_user

    def initialize
      @user_name = USER_NAME
      @user_email = USER_EMAIL
    end

    def process!
      create_user!
    end

    private

      def create_user!
        @current_user = User.create!(
          name: "Oliver Smith",
          email: "oliver@example.com",
          site_id: current_site.id
        )
      end
  end
end
