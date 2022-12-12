# frozen_string_literal: true

json.extract! article,
  :id,
  :title,
  :body,
  :updated_at,
  :slug,
  :status,
  :category_id,
  :position,
  :versions,
  :visits

json.category article.category
json.author article.user, :name, :site_id
