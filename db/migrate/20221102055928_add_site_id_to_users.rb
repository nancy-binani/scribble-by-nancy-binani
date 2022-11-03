# frozen_string_literal: true

class AddSiteIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :site_id, :integer
  end
end
