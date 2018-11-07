Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :songs, :notes, :melodies

  get '/', to: 'songs#index'
end
