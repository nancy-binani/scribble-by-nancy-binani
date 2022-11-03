
json.extract! category,
  :id,
  :category,
  :position

json.articles category.articles, :title, :body, :created_at, :slug
