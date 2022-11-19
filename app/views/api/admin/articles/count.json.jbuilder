# frozen_string_literal: true

json.count do
  json.count_by_status @count_by_status
  json.count_by_category @count_by_category
end
