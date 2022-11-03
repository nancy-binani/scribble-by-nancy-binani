# frozen_string_literal: true

class AddForeignKeyToRedirectionsOfSite < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :redirections, :sites, on_delete: :cascade
  end
end
