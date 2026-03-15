using System.Text.Json;
using System.Text.Json.Serialization;
using StackExchange.Redis;

namespace DoAnTotNghiep.Infrastructure.Persistence;

public class RedisContext
{
    private IDatabase _redisCache;
    private static int TTLRedisCacheDefault = 5;

    public RedisContext(RedisSettings settings)
    {
        var connectionString = new RedisSettings().ConnectionString;
        _redisCache = ConnectionMultiplexer.Connect(connectionString).GetDatabase();
    }

    // Time - Minutes
    public async Task SetAsync<T>(string key, string value, TimeSpan? expiresIn = null)
    {
        var json = JsonSerializer.Serialize(value);
        await _redisCache.StringSetAsync(key, json, expiresIn ?? TimeSpan.FromMinutes(TTLRedisCacheDefault));
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        var value = await _redisCache.StringGetAsync(key);
        if (value.IsNullOrEmpty) return default;
        return JsonSerializer.Deserialize<T>(value);
    }

    public async Task RemoveAsync(string key)
    {
        await _redisCache.KeyDeleteAsync(key);
    }
}