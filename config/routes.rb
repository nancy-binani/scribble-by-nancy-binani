# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    defaults format: :json do
      namespace :public do
        resources :categories, only: :index
      end
      namespace :admin do
        resources :redirections, except: %i[new edit]
        resource :site, except: %i[new edit index destroy]
        resources :users, only: :index
        resource :session, only: :create
        resources :articles, except: %i[new edit show] do
          get "count", on: :collection
        end
        resources :categories do
          put :update_with_position, on: :collection
        end
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
