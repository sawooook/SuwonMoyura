class ResponseWrapper


  def self.wrap_as_list(data)
    if data
      {
       data: data
      }
    end

  end

end