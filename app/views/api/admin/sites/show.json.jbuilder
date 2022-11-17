# frozen_string_literal: true

json.site do
   json.id @current_site.id
   json.sitename @current_site.sitename
   json.status @current_site.status
   json.authentication_token @current_site.authentication_token
   json.users @current_site.users, :username, :id
 end
