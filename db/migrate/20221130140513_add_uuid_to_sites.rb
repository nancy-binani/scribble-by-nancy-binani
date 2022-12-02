# frozen_string_literal: true

class AddUuidToSites < ActiveRecord::Migration[6.1]
  def change
    add_column :sites, :uuid, :uuid, default: "gen_random_uuid()", null: false
    rename_column :sites, :id, :sites_id
    rename_column :sites, :uuid, :id
    execute "ALTER TABLE sites drop constraint sites_pkey;"
    execute "ALTER TABLE sites ADD PRIMARY KEY (id);"
    remove_column :sites, :sites_id
  end
end
