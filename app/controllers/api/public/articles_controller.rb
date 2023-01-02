# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  def index
    @articles = current_user.articles.select { |article| article.status == "published" }
  end
end
