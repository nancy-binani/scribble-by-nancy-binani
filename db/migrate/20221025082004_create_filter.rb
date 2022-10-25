# frozen_string_literal: true

class CreateFilter < ActiveRecord::Migration[6.1]
  def change
    create_table :filters do |t|
      t.string :columns, array: true, default: []
      t.string :status
      t.string :category
      t.timestamps
    end
  end
end
