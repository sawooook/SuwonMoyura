class Site < ApplicationRecord
  geocoded_by :address
  after_validation :geocode
  reverse_geocoded_by :lat, :lng
  after_validation :reverse_geocode

  #- 위치가 없는 장소들은 제외
  def self.list_of_site
    where.not(lat: nil, lng: nil)
  end

  def self.list_of_near_distance(lat, lng)
    near([lat,lng], 0.1)
  end

  #- Redis에 장소들의 데이터를 저장한다.
  def self.create_site_json
    MyRedis.set("site_json_cache", ResponseWrapper.wrap_as_list(Site.list_of_site))
  end

  #- Redis에 저장한 데이터를 불러옴
  def self.load_cached_site
    MyRedis.getData("site_json_cache")
  end

  def as_json(option = {})
    {
      name: self.name,
      lat: self.lat,
      lng: self.lng
    }
  end
end
