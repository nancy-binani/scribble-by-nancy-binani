# frozen_string_literal: true

json.extract! article,
  :id,
  :title,
  :body,
  :updated_at,
  :created_at,
  :slug,
  :status,
  :category_id,
  :position,
  :versions,
  :restored,
  :restored_at,
  :visits_count,
  :scheduled_publish,
  :scheduled_unpublish

json.category article.category
json.author article.user, :name, :site_id
json.dates_and_visits article.visits.group("DATE(created_at)").distinct.count
