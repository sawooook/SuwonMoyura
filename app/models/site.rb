class Site < ApplicationRecord

  def self.list_of_site
    where.not(lat: nil, lng: nil)
  end

  def self.create_site_json
    MyRedis.set("site_json_cache", ResponseWrapper.wrap_as_list(Site.list_of_site))
  end


  def self.cached_site
    MyRedis.getData("site_json_cache")
  end
end
