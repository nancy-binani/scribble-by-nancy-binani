# frozen_string_literal: true

class DropColumnAssignedSiteIdFromRedirections < ActiveRecord::Migration[6.1]
  def change
    remove_column :redirections, :assigned_site_id
  end
end
