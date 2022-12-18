# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  def index
    @articles_count = current_user.articles.count
    @articles = current_user.articles.order(visits_count: :desc).page params[:page]
  end
end
