# frozen_string_literal: true

class AddForeignKeyToArticles < ActiveRecord::Migration[6.1]
  def change
    Article.reset_column_information
    add_foreign_key :articles, :categories, on_delete: :cascade
  end
end
