# frozen_string_literal: true

class ArticlePublishAtService
  attr_accessor :article

  def initialize(article)
    @article = article
  end

  def process
    publish
  end

  private

    def publish
      article.update!(status: "published", scheduled_publish: nil)
    end
end
