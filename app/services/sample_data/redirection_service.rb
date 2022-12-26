# frozen_string_literal: true

module SampleData
  class RedirectionService < Base
    def process!
      create_redirection!
    end

    private

      def create_redirection!
        Redirection.create!(
          from: "/1",
          to: "/2",
          site_id: current_site.id
        )
      end
  end
end
