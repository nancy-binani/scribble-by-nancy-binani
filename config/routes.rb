# frozen_string_literal: true

Rails.application.routes.draw do
  resources :categories, only: %i[index create update destroy show]
  resources :redirections, only: %i[index create update destroy show]
  resources :articles, only: %i[index create update destroy show], param: :slug
  resources :sites do
    member do
      patch :update_status
      put :update_status
    end
  end
  resource :session, only: :create
  root "home#index"
  get "*path", to: "home#index", via: :all
end
