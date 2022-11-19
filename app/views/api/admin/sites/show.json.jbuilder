# frozen_string_literal: true

json.site do
   json.id @_current_site.id
   json.name @_current_site.name
   json.status @_current_site.status
   json.authentication_token @_current_site.authentication_token
   json.users @_current_site.users, :username, :id
 end
