# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    defaults format: :json do
      namespace :public do
        resources :categories, only: %i[index]
        resources :articles, only: %i[index]
      end
      namespace :admin do
        resources :redirections, except: %i[new edit]
        resource :site, except: %i[new edit index destroy]
        resources :users, only: :index
        resource :session, only: :create
        resources :articles, except: %i[new edit show] do
          put :update_with_position, on: :collection
          put :update_visits_count, on: :member
          put :move_to_category, on: :collection
          get :count, on: :collection
          get :versions, on: :member
          get :list_schedules, on: :member
          post :create_schedule, on: :member
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
