# frozen_string_literal: true

class AddForeignKeyToUsersOfSite < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :users, :sites, on_delete: :cascade
  end
end
