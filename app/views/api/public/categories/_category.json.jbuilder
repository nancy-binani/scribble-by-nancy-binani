# frozen_string_literal: true

json.extract! category,
  :id,
  :category,
  :position

json.articles category.articles, :id, :title, :body, :created_at, :slug, :visits, :visits_count
