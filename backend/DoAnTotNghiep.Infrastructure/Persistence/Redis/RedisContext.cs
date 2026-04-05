using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using StackExchange.Redis;
using DoAnTotNghiep.Application.Common;

namespace DoAnTotNghiep.Infrastructure.Persistence;

public class RedisContext : ICacheService
{
    private readonly Lazy<ConnectionMultiplexer>? _multiplexer;
    private readonly IMemoryCache _memoryCache;
    private static int TTLRedisCacheDefault = 5;

    public RedisContext(RedisSettings settings, IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
        if (!string.IsNullOrEmpty(settings?.ConnectionString))
        {
            _multiplexer =
                new Lazy<ConnectionMultiplexer>(() => ConnectionMultiplexer.Connect(settings.ConnectionString));
        }
    }

    private IDatabase? GetRedisDb()
    {
        try
        {
            if (_multiplexer != null && _multiplexer.Value.IsConnected)
                return _multiplexer.Value.GetDatabase();
        }
        catch
        {
        }

        return null;
    }


    public async Task SetAsync<T>(string key, T value, TimeSpan? expiresIn = null)
    {
        var expiration = expiresIn ?? TimeSpan.FromMinutes(TTLRedisCacheDefault);
        var db = GetRedisDb();
        if (db != null)
        {
            try
            {
                var json = JsonSerializer.Serialize(value);
                await db.StringSetAsync(key, json, expiration);
                return;
            }
            catch
            {
            }
        }

        _memoryCache.Set(key, value, expiration);
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        var db = GetRedisDb();
        if (db != null)
        {
            try
            {
                var value = await db.StringGetAsync(key);
                if (!value.IsNullOrEmpty) return JsonSerializer.Deserialize<T>(value);
            }
            catch
            {
            }
        }

        return _memoryCache.Get<T>(key);
    }

    public async Task RemoveAsync(string key)
    {
        var db = GetRedisDb();
        if (db != null)
        {
            try
            {
                await db.KeyDeleteAsync(key);
            }
            catch
            {
            }
        }

        _memoryCache.Remove(key);
    }
}