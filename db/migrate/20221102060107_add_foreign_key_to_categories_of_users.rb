# frozen_string_literal: true

class AddForeignKeyToCategoriesOfUsers < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :categories, :users, on_delete: :cascade
  end
end
