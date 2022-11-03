# frozen_string_literal: true

class DropColumnAssignedSiteIdFromArticles < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :assigned_site_id
  end
end
