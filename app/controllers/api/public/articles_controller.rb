# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[update]
  def index
    @articles = current_user.articles.order(visits_count: :desc).page params[:page]
    @articles = FilterArticleService.new(@articles, params[:status], params[:title], params[:category_ids]).process
    @articles = @articles.select { |article| article.status == "published" }
  end

  def update
    @article.visits.create!
    @article.reload
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
