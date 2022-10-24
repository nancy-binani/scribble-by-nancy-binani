# frozen_string_literal: true

class AddAssignedSiteIdToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :assigned_site_id, :integer
  end
end
