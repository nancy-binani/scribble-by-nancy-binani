# frozen_string_literal: true

json.extract! article,
  :id,
  :title,
  :body,
  :created_at,
  :updated_at,
  :slug,
  :status,
  :category_id,
  :position,
  :versions,
  :visits_count

json.category article.category
json.author article.user, :name, :site_id
json.dates_and_visits article.visits.group("DATE(created_at)").distinct.count
