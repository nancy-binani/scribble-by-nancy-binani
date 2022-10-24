# frozen_string_literal: true

class AddForeignKeyToRedirection < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :redirections, :sites, column: :assigned_site_id
  end
end
