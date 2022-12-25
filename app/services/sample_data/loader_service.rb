# frozen_string_literal: true

module SampleData
  class LoaderService < ActionController::Base
    include SampleData::LoadersList
    def process!
      load_sample_data!
    end

    private

      def load_sample_data!
        loaders_list.each do |loader_service|
          loader_service.new.load!
        end
      end
  end
end
