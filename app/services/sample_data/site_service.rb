# frozen_string_literal: true

module SampleData
  class SiteService < Base
    SITE_NAME = "Spinkart"
    PASSWORD = "welcome1"
    STATUS = "checked"

    attr_reader :site_name, :password, :status

    def initialize
      @site_name = SITE_NAME
      @password = PASSWORD
      @status = STATUS
    end

    def process!
      create_site!
    end

    private

      def create_site!
        @current_site = Site.create!(
          name: site_name,
          password: password,
          status: status
        )
      end
  end
end
