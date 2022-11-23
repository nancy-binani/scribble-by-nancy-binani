# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :redirect_to_path, only: %i[index]
  def index
    render
  end

  def redirect_to_path
    redirection = current_site.redirections.find_by(from: request.path)
    if redirection
      redirect_to redirection.to, status: :moved_permanently
    end
  end
end
