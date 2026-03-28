using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Email;
using DoAnTotNghiep.Domain.Token;
using DoAnTotNghiep.Infrastructure.Persistence;
using DoAnTotNghiep.Infrastructure.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DoAnTotNghiep.Infrastructure.Persistence.Email.Template;
using DoAnTotNghiep.Infrastructure.Repositories;

namespace DoAnTotNghiep.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<MongoDbContext>();
        services.AddSingleton<MongoDbInitializer>();
        services.AddScoped<Domain.Users.IUserRepository, Repositories.UserRepository>();
        services.AddScoped<IPasswordHasher, BCryptPasswordHasher>();
        services.AddScoped<IEmailService, MailKitEmailService>();
        services.AddScoped<IEmailTemplateService, EmailTemplateService>();
        services.AddTransient<IPasswordResetToken, PasswordResetTokenRepository>();
        services.AddTransient<ITokenGenerator, TokenGenerateService>();
        var redisSettings = configuration.GetSection("Redis").Get<RedisSettings>();

        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisSettings?.ConnectionString ?? throw new ArgumentNullException("Redis connection is missing");
        });
        var smtpSettings = configuration.GetSection("Smtp");
        services.Configure<EmailSettings>(smtpSettings);

        return services;
    }
}