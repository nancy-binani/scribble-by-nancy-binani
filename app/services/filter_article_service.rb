# frozen_string_literal: true

class FilterArticleService
  attr_reader :articles, :status, :category_ids, :title

  def initialize(articles, status, title, category_ids)
    @articles = articles
    @status = status
    @title = title
    @category_ids = category_ids
  end

  def process
    if status != nil && status != "All"
      @articles = articles.where(status: status.downcase)
    end

    if category_ids.present?
      @articles = articles.where(category_id: category_ids)
    end

    if title != nil
      @articles = articles.where("lower(title) LIKE ?", "%#{title.downcase}%")
    end

    @articles
  end
end
