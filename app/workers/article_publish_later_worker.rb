# frozen_string_literal: true

class ArticlePublishLaterWorker
  include Sidekiq::Worker

  def perform
    publish_later_articles
  end

  private

    def publish_later_articles
      articles = Article.all.select { |article|
        (article.scheduled_publish and article.scheduled_publish <= Time.zone.now)
      }
      articles.each do |article|
        article_schedule_publish_later = ArticlePublishLaterService.new(article)
        article_schedule_publish_later.process
      end
    end
end
