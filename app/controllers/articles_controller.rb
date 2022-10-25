# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :set_current_site

  def index
    articles = Article.all.as_json(include: { assigned_category: { only: %i[category id] } })
    respond_with_json({ articles: articles })
  end

  def create
    article = Article.create!(article_params.merge(assigned_site_id: @current_site.id))
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def show
    render status: :ok, json: { article: @article, assigned_category: @article.assigned_category }
  end

  def filter_status
    articles = Article.filter_status
    respond_with_json({ articles: articles })
  end

  def filter_by_category
    articles = Article.filter_by_category
    respond_with_json({ articles: articles })
  end

  def filter_articles
    articles = Article.filter_columns
    respond_with_json({ articles: articles })
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :body, :author, :status, :category_id, :assigned_site_id)
    end
end
