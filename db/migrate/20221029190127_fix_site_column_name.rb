# frozen_string_literal: true

class FixSiteColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :sites, :checked, :status
  end
end
