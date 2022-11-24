# frozen_string_literal: true

class AddStatusToSite < ActiveRecord::Migration[6.1]
  def change
    add_column :sites, :status, :string
  end
end
