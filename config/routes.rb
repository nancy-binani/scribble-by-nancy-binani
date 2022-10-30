# frozen_string_literal: true

Rails.application.routes.draw do
  resources :categories do
    member do
      put :update_with_position
    end
  end
  resources :redirections, except: %i[new edit]

  resources :articles, except: %i[new edit show] do
    get "filter_by_category", on: :collection
    get "filter_status", on: :collection
  end
  resource :site
  resource :session, only: :create
  root "home#index"
  get "*path", to: "home#index", via: :all
end
