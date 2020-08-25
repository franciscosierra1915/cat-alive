Rails.application.routes.draw do
  resources :cats
  resources :shelters
  resources :vets
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
