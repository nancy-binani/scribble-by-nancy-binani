# frozen_string_literal: true

class AddSiteIdToRedirections < ActiveRecord::Migration[6.1]
  def change
    add_column :redirections, :site_id, :integer
  end
end
