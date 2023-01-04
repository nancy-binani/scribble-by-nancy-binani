# frozen_string_literal: true

class ArticlePublishAtWorker
  include Sidekiq::Worker

  def perform(article)
    ArticlePublishLaterService.new(article).process
  end
end
