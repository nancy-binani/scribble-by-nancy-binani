# frozen_string_literal: true

class RenameColumnSiteName < ActiveRecord::Migration[6.1]
  def change
    rename_column :sites, :sitename, :name
  end
end
