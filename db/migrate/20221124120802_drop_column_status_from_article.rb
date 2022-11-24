# frozen_string_literal: true

class DropColumnStatusFromArticle < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :status
  end
end
