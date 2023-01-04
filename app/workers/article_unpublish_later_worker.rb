# frozen_string_literal: true

class ArticleUnpublishLaterWorker
  include Sidekiq::Worker

  def perform
    article_schedule_unpublish_later = ArticleUnpublishLaterService.new()
    article_schedule_unpublish_later.process
  end
end
