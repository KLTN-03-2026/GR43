using System.Reflection;
using DoAnTotNghiep.Application.Behaviors;
using Microsoft.Extensions.DependencyInjection;

namespace DoAnTotNghiep.Application;

public static class DependencyInjection
{
    
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            cfg.AddOpenBehavior(typeof(LoggingBehavior<,>));
        });
        return services;
    }
}