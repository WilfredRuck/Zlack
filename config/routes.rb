Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  mount ActionCable.server, at: '/cable'
  
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :channels, only: [:create, :show, :index, :update, :delete] do
      resources :users, only: [:index]
      resources :messages, only: [:index]
      resources :subscriptions, only: [:create, :destroy]
    end
    resources :messages, only: [:create]
  end
end
