# frozen_string_literal: true

class Api::Admin::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[update destroy update_with_position versions]
  before_action :create_visits_count!, only: %i[update_visits_count]

  def index
    @articles_count = current_user.articles.count
    @articles = current_user.articles.order(visits_count: :desc).order(:position).includes(:category).page params[:page]
    @articles = FilterArticleService.new(@articles, params[:status], params[:title], params[:category_ids]).process
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.remove_from_list
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def count
    counts_by_status = Article.group(:status).distinct.count
    @count_by_status = { **counts_by_status, "all": counts_by_status.values.sum }
    @count_by_category = Article.group(:category_id).distinct.count
  end

  def update_with_position
    @article.insert_at(params[:article][:position].to_i)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def move_to_category
    MoveArticlesService.new(current_user, params["article_ids"], params[:category_id]).process
  end

  def versions
    @article_versions = @article.versions
    render
  end

  def update_visits_count
    @article.reload
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def create_visits_count!
      load_article!
      @article.visits.create
    end

    def article_params
      params.require(:article).permit(
        :title, :body, :author, :status, :category_id, :position, :restored, :restored_at,
        :scheduled_publish, :scheduled_unpublish)
    end
end
