# frozen_string_literal: true

class FiltersController < ApplicationController
  before_action :load_filter!, only: %i[show update]

  def index
    filters = Filter.all
    respond_with_json({ filters: filters })
  end

  def create
    filter = Filter.create!(filter_params)
    respond_with_success(t("successfully_created", entity: "Filter"))
  end

  def show
    respond_with_json({ filter: @filter })
  end

  def update
    @filter.update!(filter_params)
    respond_with_success(t("successfully_updated", entity: "Filter"))
  end

  private

    def load_filter!
      @filter = Filter.find_by!(id: params[:id])
    end

    def filter_params
      params.require(:filter).permit(:status, categories: [])
    end
end
