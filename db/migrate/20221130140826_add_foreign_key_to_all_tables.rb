# frozen_string_literal: true

class AddForeignKeyToAllTables < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key "articles", "categories", on_delete: :cascade
    add_foreign_key "articles", "users", on_delete: :cascade
    add_foreign_key "categories", "users", on_delete: :cascade
    add_foreign_key "redirections", "sites", on_delete: :cascade
    add_foreign_key "users", "sites", on_delete: :cascade
  end
end
