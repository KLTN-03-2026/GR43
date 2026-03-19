using MediatR;
using Microsoft.Extensions.Logging;

namespace DoAnTotNghiep.Application.Behaviors;

public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;

    public LoggingBehavior(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
        => _logger = logger;

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken ct)
    {
        var requestName = typeof(TRequest).Name;
        _logger.LogInformation("Request {Name} {@Request}", requestName , Sanitize(request));
        var response = await next();
        _logger.LogInformation("Completed Request {Name}", requestName);
        return response;
    }

    private object Sanitize(object obj)
    {
        var props = obj.GetType().GetProperties();

        var dict = new Dictionary<string, object?>();

        foreach (var prop in props)
        {
            var isSensitive = Attribute.IsDefined(prop, typeof(SensitiveDataAttribute));

            var value = prop.GetValue(obj);

            dict[prop.Name] = isSensitive ? "***REDACTED***" : value;
        }

        return dict;
    }
}