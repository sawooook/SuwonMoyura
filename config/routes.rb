Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "main#index"
  resources :sites do
    collection do
      get :search_sites
    end
  end
end
