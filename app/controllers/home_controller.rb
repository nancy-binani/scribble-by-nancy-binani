# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    redirections = current_site.redirections.all
    redirections.each do |redirection|
      if redirection.from == request.original_url
        redirect_to redirection.to
        return
      end
    end
    render
  end
end
