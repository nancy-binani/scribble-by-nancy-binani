# frozen_string_literal: true

class AddPositionToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :position, :integer
    add_column :articles, :restored_at, :datetime
    add_column :articles, :restored, :boolean
    add_column :articles, :visits, :integer, default: 0
  end
end
