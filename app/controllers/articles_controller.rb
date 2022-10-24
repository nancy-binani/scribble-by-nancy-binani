# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :set_current_site

  def index
    articles = Article.all.as_json(include: { assigned_category: { only: %i[category id] } })
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params.merge(assigned_site_id: @current_site.id))
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
    render status: :ok, json: { article: article, assigned_category: article.assigned_category }
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :body, :author, :status, :category_id, :assigned_site_id)
    end
end
