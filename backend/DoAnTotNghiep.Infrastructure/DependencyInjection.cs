using DoAnTotNghiep.Infrastructure.Persistence;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DoAnTotNghiep.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<MongoDbContext>();
        services.AddSingleton<MongoDbInitializer>();
        services.AddScoped<Domain.Users.IUserRepository, Repositories.UserRepository>();

        var redisSettings = configuration.GetSection("Redis").Get<RedisSettings>();

        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisSettings?.ConnectionString ?? "localhost:6379";
        });

        return services;
    }
}