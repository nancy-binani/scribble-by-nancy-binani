# frozen_string_literal: true

class ArticlePublishLaterService
  def process
    schedule_articles_to_be_publish_later
  end

  private

    def find_articles_having_publish_schedule
      Article.select { |article| article.scheduled_publish && article.scheduled_publish <= Time.zone.now }
    end

    def schedule_articles_to_be_publish_later
      articles = find_articles_having_publish_schedule
      articles.each { |article|
        ArticlePublishAtWorker.perform_async(article)
      }
    end
end
