# frozen_string_literal: true

class Api::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[update destroy]
  before_action :current_user

  def index
    @articles = current_user.articles
    @articles = FilterArticleService.new(@articles, params).process
  end

  def create
    article = current_user.articles.create!(article_params)
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

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def article_params
      params.require(:article).permit(
        :title, :body, :author, :status, :category_id)
    end
end
