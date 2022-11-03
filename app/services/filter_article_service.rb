# frozen_string_literal: true

class FilterArticleService
  attr_reader :articles, :params

  def initialize(articles, params)
    @articles = articles
    @params = params
  end

  def process
    if params.has_key?(:status) && params[:status] != "All"
      @articles = @articles.where(status: params[:status])
    end

    if params.has_key?(:category) && params[:category] != []
      @articles = @articles.where(category_id: params[:category])
    end

    if params.has_key?(:title)
      @articles = @articles.where("title LIKE ?", "%#{params[:title]}%")
    end
    @articles
  end
end
