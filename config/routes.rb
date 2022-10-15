# frozen_string_literal: true

Rails.application.routes.draw do
  resources :categories, only: %i[index create update destroy show]
  resources :articles, only: %i[index create update destroy show], param: :slug
  resources :sites, only: %i[index create update show]
  root "home#index"
  get "*path", to: "home#index", via: :all
end
