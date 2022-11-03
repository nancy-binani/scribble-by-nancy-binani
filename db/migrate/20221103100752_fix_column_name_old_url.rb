# frozen_string_literal: true

class FixColumnNameOldUrl < ActiveRecord::Migration[6.1]
  def change
    rename_column :redirections, :oldurl, :from
  end
end
