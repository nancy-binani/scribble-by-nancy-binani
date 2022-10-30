# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[update destroy]
  before_action :set_current_site

  def index
    articles = Article.all.as_json(include: { assigned_category: { only: %i[category id] } })
    respond_with_json({ articles: articles })
  end

  def create
    article = Article.create!(article_params)
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

  def filter_status
    articles = Article.filter_status(params.permit(:status))
    articles = articles.all.as_json(include: { assigned_category: { only: %i[category id] } })
    respond_with_json({ articles: articles })
  end

  def filter_by_category
    params.permit!
    articles = Article.filter_by_category(params.permit(category: []))
    articles = articles.all.as_json(include: { assigned_category: { only: %i[category id] } })
    respond_with_json({ articles: articles })
  end

  private

    def load_article!
      @article = Article.find_by!(id: params[:id])
    end

    def article_params
      params.require(:article).permit(
        :title, :body, :author, :status,
        :category_id).merge(assigned_site_id: @current_site.id)
    end
end
