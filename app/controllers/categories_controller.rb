# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[ show update destroy]
  before_action :set_current_site

  def index
    categories = Category.all.order(:position).as_json(
      include: {
        assigned_articles: {
          only: %i[title body created_at
          slug]
        }
      })
    respond_with_json({ categories: categories })
  end

  def create
    category = Category.create!(category_params.merge(assigned_site_id: @current_site.id))
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def show
    respond_with_json({ category: @category, assigned_articles: @category.assigned_articles })
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def update_with_position
    params.require(:category).permit!
    params[:category][:position].each_with_index do |category, index|
      required_category = Category.find_by!(id: category).update!(position: index + 1)
    end
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def destroy
    @category.destroy!
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  private

    def load_category!
      @category = Category.find_by(id: params[:id])
    end

    def category_params
      params.permit(:category, :position)
    end
end
