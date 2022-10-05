# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[update]

  def index
    articles = Article.all
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success("Task was successfully created")
  end

  def update
    task = Task.find_by!(slug: params[:slug])
    task.update!(task_params)
    respond_with_success("Task was successfully updated!")
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :body, :author, :status, categories: [])
    end
end
