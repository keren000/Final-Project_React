Rails.application.routes.draw do
  post "/books/search",to: "books#search"
  resources :books
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
