# frozen_string_literal: true

class AddForeignKeyToCategory < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :categories, :sites, column: :assigned_site_id
  end
end
