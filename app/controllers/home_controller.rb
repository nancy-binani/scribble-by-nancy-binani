# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :redirect_to_path, only: %i[index]
  def index
    render
  end

  def redirect_to_path
    @redirections = current_site.redirections.all
    @redirections.each do |redirection|
      if redirection.from == request.path
        redirect_to redirection.to
        return
      end
    end
  end
end
