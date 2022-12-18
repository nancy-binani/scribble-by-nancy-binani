# frozen_string_literal: true

class AddVisitsCountToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :visits_count, :integer, default: 0
    add_column :visits, :article_id, :uuid
  end
end