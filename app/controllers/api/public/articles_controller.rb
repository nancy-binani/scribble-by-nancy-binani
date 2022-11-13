# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show]
  before_action :current_user

  def index
    @articles = current_user.articles
  end

  def show
    respond_with_json({ article: @article })
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def article_params
      params.require(:article).permit(
        :title, :body, :author, :status, :category_id)
    end
end
