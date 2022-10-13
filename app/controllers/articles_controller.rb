# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]

  def index
    articles = Article.all
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success("Article was successfully created")
  end

  def update
    @article.update!(article_params)
    respond_with_success("Article was successfully updated!")
  end

  def destroy
    @article.destroy!
    respond_with_json
  end

  def show
    article = Article.find_by!(slug: params[:slug])
    render status: :ok, json: { article: article }
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :body, :author, :status, :category_id)
    end
end
