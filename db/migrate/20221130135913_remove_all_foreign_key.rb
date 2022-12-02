# frozen_string_literal: true

class RemoveAllForeignKey < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key "articles", "categories"
    remove_foreign_key "articles", "users"
    remove_foreign_key "categories", "users"
    remove_foreign_key "redirections", "sites"
    remove_foreign_key "users", "sites"
  end
end
