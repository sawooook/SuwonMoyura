class MyRedis
  def self.set(key, value)
    redis.set key, value.to_json
  end

  def self.redis
    @@redis ||= Redis.new
  end

  def self.getData(key)
    redis.get key
  end

  def self.get(key)
    HashWithIndifferentAccess.new(JSON.parse (redis.get key) || {})
  end
end