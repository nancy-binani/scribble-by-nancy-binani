# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[ show edit update destroy ]

  def index
    categories = Category.all
    render status: :ok, json: { categories: categories }
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success("Category was successfully created")
  end

  def show
    category = Category.find_by(id: params[:id])
    render status: :ok, json: { category: category }
  end

  def update
    @category.update!(category_params)
    respond_with_success("Category was successfully updated!")
  end

  def destroy
    @category.destroy!
    respond_with_json
  end

  private

    def load_category!
      @category = Category.find_by(id: params[:id])
    end

    def category_params
      params.permit(:category)
    end
end
