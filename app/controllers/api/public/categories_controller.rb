# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :current_user

  def index
    @categories = current_user.categories.order(:position)
  end
end
