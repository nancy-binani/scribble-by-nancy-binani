# frozen_string_literal: true

class DropColumnAssignedSiteIdFromCategories < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :assigned_site_id
  end
end
