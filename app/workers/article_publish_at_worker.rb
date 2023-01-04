# frozen_string_literal: true

class ArticlePublishAtWorker
  include Sidekiq::Worker

  def perform(article)
    ArticlePublishAtService.new(article).process
  end
end
