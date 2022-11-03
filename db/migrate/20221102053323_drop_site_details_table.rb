# frozen_string_literal: true

class DropSiteDetailsTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :site_details
  end
end
