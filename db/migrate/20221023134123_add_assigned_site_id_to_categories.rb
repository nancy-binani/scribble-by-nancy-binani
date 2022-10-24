# frozen_string_literal: true

class AddAssignedSiteIdToCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :assigned_site_id, :integer
  end
end
