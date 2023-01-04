# frozen_string_literal: true

class ArticleUnpublishAtWorker
  include Sidekiq::Worker

  def perform(article)
    ArticleUnpublishAtService.new(article).process
  end
end
