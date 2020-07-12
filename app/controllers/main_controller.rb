class MainController < ApplicationController

  def index
    redirect_to search_currency_sites_path
  end
end
