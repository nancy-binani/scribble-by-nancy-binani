# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiExceptions

  private

    def current_site
      @_current_site = Site.first
    end

    def current_user
      current_site
      @_current_user ||= @_current_site.users.first
    end
end
