class Currency
  BASE_API_URL = "https://openapi.gg.go.kr/RegionMnyFacltStus"
  KEY = "69608ddce0ae4f5cb3f07b657ee8372a"
  SIGUN_CD = "41110"
  LOAD_PAGE = 495
  COUNT = 100

  def self.api_call
    key_num = 0
      LOAD_PAGE.times do
        key_num += 1
        response = HTTParty.get(
            "#{BASE_API_URL}?KEY=#{KEY}&SIGUN_CD=#{SIGUN_CD}&pIndex=#{key_num}&Type=json",
            )
        prepare = JSON(response.body)
        COUNT.times do |num|
          data = prepare["RegionMnyFacltStus"][1]["row"][num]
          Site.create!(name: data["CMPNM_NM"], category: data["INDUTYPE_NM"], address: data["REFINE_ROADNM_ADDR"],
                       lat: data["REFINE_WGS84_LAT"], lng: data["REFINE_WGS84_LOGT"], phone: data["TELNO"], zipcode: data["REFINE_ZIP_CD"])
        end
      end
  end
end
