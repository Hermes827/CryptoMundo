Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :update, :destroy]
      post '/login', to: 'auth#login'
      get '/profile', to: 'users#profile'
      get '/shelf/:id', to: 'users#shelf'
      post 'add_crypto', to: 'users#addCrypto'
      delete 'remove_crypto/:id', to: 'users#removeCrypto'
      get 'authorize', to: 'auth#validate'
      get '/searchbyname', to: 'cryptos#searchByName'
  
    end
  end
end
