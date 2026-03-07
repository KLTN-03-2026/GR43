using DoAnTotNghiep.Application.Users;
using DoAnTotNghiep.Domain.Users;
using DoAnTotNghiep.Infrastructure.Repositories;

namespace DoAnTotNghiep.Web;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<UserService>();
        return services;
    }
}