# frozen_string_literal: true

json.extract! category,
  :id,
  :category,
  :position

json.articles category.articles
json.author category.user, :name, :site_id
