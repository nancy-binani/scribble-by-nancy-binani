# frozen_string_literal: true

class CreateSiteDetails < ActiveRecord::Migration[6.1]
  def change
    create_table :site_details do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
