# frozen_string_literal: true

class ArticleUnpublishLaterWorker
  include Sidekiq::Worker

  def perform
    unpublish_later_articles
  end

  private

    def unpublish_later_articles
      articles = Article.all.select { |article|
        (article.scheduled_unpublish && article.scheduled_unpublish <= Time.zone.now)
      }

      articles.each do |article|
        article_schedule_unpublish_later = ArticleUnpublishLaterService.new(article)
        article_schedule_unpublish_later.process
      end
    end
end
