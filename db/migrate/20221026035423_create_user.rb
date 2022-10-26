# frozen_string_literal: true

class CreateUser < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.integer :assigned_site_id
      t.timestamps
    end
  end
end
