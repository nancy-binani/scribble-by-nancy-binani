# frozen_string_literal: true

class DropColumnStatusFromSite < ActiveRecord::Migration[6.1]
  def change
    remove_column :sites, :status
  end
end
