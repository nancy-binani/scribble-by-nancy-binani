# frozen_string_literal: true

require "faker"

module SampleData
  class Base
    def current_site
      @_current_site ||= Site.first
    end

    def current_user
      @_current_user ||= User.first
    end

    def print_success
      print "[DONE]\n"
    end

    def load!
      process!
      print_success
    end
  end
end
