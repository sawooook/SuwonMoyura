class Currency::SitesController < Currency::ApplicationController

  def index
    @sites = Site.load_cached_site
  end

  def search_sites
    sites_lat = params[:lat]
    sites_lng = params[:lng]

    #- X,Y 좌표(내위치)를 받아와 근처거리에 있는 지점들의 리스트를 불러온다
    load_site = Site.list_of_near_distance(sites_lat, sites_lng)
    render json: ResponseWrapper.wrap_as_list(load_site.list_of_site.as_json), status: :ok
  end

  def search
    @sites = Site.all.limit(25)
  end

  def site_search
    @sites = Site.all.limit(10)

    render partial: "sites_list", locals: {sites: @sites}
  end
end
