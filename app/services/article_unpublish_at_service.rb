# frozen_string_literal: true

class ArticleUnpublishAtService
  attr_accessor :article

  def initialize(article)
    @article = article
  end

  def process
    unpublish
  end

  private

    def unpublish
      article.update!(status: "draft", scheduled_unpublish: nil)
    end
end
