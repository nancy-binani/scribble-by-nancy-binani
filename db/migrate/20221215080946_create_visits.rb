# frozen_string_literal: true

class CreateVisits < ActiveRecord::Migration[6.1]
  def change
    create_table :visits, id: :uuid do |t|
      t.timestamps
    end
  end
end
