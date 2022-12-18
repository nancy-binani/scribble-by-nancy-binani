# frozen_string_literal: true

class PopulateArticleResponsesCount < ActiveRecord::Migration[6.1]
  def up
    Article.find_each do |article|
      Article.reset_counters(article.id, :visits)
    end
  end

  def down
    # no rollback needed
  end
end
