# frozen_string_literal: true

class ArticleUnpublishAtWorker
  include Sidekiq::Worker

  def perform(article)
    ArticleUnPublishLaterService.new(article).process
  end
end
