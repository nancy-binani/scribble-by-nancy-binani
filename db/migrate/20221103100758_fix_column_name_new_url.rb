# frozen_string_literal: true

class FixColumnNameNewUrl < ActiveRecord::Migration[6.1]
  def change
    rename_column :redirections, :newurl, :to
  end
end
