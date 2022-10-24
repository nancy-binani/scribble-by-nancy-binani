# frozen_string_literal: true

class AddAssignedSiteIdToRedirections < ActiveRecord::Migration[6.1]
  def change
    add_column :redirections, :assigned_site_id, :integer
  end
end
