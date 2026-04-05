namespace DoAnTotNghiep.Application.Common;

public interface ICacheService
{
    Task SetAsync<T>(string key, T value, TimeSpan? expiresIn = null);
    Task<T?> GetAsync<T>(string key);
    Task RemoveAsync(string key);
}
