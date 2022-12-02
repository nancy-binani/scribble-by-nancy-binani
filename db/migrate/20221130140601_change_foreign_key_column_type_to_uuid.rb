# frozen_string_literal: true

class ChangeForeignKeyColumnTypeToUuid < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :user_id
    add_column :articles, :user_id, :uuid
    remove_column :articles, :category_id
    add_column :articles, :category_id, :uuid
    remove_column :categories, :user_id
    add_column :categories, :user_id, :uuid
    remove_column :redirections, :site_id
    add_column :redirections, :site_id, :uuid
    remove_column :users, :site_id
    add_column :users, :site_id, :uuid
  end
end
