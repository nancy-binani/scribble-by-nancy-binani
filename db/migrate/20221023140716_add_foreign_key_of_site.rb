# frozen_string_literal: true

class AddForeignKeyOfSite < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :sites, column: :assigned_site_id
  end
end
