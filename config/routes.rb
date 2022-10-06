# frozen_string_literal: true

Rails.application.routes.draw do
  resources :articles, only: %i[index create], param: :slug
  root "home#index"
  get "*path", to: "home#index", via: :all
end