# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    articles = Article.all
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success("Task was successfully created")
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :author, :category, :status, :slug)
    end
end
