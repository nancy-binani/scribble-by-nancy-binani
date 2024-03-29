# frozen_string_literal: true

class Api::Admin::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[ update destroy update_with_position]

  def index
    @categories = current_user.categories.order(:position).includes(:articles)
    @categories = SearchCategoryService.new(@categories, params[:category]).process
  end

  def create
    current_user.categories.create!(category_params)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def destroy
    DeleteCategoryService.new(params[:move_category], @category, current_user).process
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  def update_with_position
    @category.insert_at(params[:category][:position].to_i)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  private

    def load_category!
      @category = current_user.categories.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:category, :position)
    end
end
