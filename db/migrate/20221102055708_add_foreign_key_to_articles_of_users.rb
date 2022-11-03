# frozen_string_literal: true

class AddForeignKeyToArticlesOfUsers < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :users, on_delete: :cascade
  end
end
