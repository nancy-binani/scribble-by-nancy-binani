# frozen_string_literal: true

class CreateSite < ActiveRecord::Migration[6.1]
  def change
    create_table :sites do |t|
      t.string :password_digest, null: false
      t.string :sitename
      t.string :checked, default: "unchecked"
      t.timestamps
    end
  end
end
