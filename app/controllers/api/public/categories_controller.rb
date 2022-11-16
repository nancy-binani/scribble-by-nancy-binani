# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[ show ]
  before_action :current_user

  def index
    @categories = current_user.categories.order(:position)
  end

  private

    def load_category!
      @category = current_user.categories.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:category, :position)
    end
end
