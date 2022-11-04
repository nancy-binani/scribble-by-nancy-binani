# frozen_string_literal: true

json.extract! article,
  :id,
  :title,
  :body,
  :created_at,
  :slug,
  :status,
  :category_id

json.category article.category, :id, :category
json.author article.user, :username, :site_id