# frozen_string_literal: true

class ArticleUnpublishLaterService
  def process
    schedule_articles_to_be_unpublish_later
  end

  private

    def find_articles_having_unpublish_schedule
      Article.select { |article| article.scheduled_unpublish && article.scheduled_unpublish <= Time.zone.now }
    end

    def schedule_articles_to_be_unpublish_later
      articles = find_articles_having_unpublish_schedule
      articles.each { |article|
        ArticleUnpublishAtWorker.perform_async(article)
      }
    end
end
