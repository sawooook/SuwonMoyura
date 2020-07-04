Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "sites#index"
  resources :sites do
    collection do
      get :search_sites
      get :search
      get :site_search
    end
  end
end
