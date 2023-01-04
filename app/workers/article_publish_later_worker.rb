# frozen_string_literal: true

class ArticlePublishLaterWorker
  include Sidekiq::Worker

  def perform
    article_schedule_publish_later = ArticlePublishLaterService.new()
    article_schedule_publish_later.process
  end
end
