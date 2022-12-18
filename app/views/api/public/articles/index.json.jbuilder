
# frozen_string_literal: true

json.articles @articles do | article |
  json.partial! "api/public/articles/article", article: article
end

json.count @articles_count
