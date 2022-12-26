# frozen_string_literal: true

module SampleData
  class DatabaseCleanupService < Base
    def process!
      DatabaseCleaner.clean_with :truncation
    end
  end
end
