# frozen_string_literal: true

class AddVisitsCountToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :visits_count, :integer, default: 0
    add_column :visits, :article_id, :uuid
    add_column :articles, :scheduled_publish, :datetime
    add_column :articles, :scheduled_unpublish, :datetime
  end
end
