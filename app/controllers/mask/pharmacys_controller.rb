class Mask::PharmacysController < Mask::ApplicationController

  def index
  end

  def load_pharmacy
    map_x = params[:lat]
    map_y = params[:lng]

    response = Mask.call_mask_api(map_x, map_y)

    render json: response, status: 200
  end
end
