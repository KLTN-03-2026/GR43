using DoAnTotNghiep.Application.Common;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace DoAnTotNghiep.Infrastructure.Security;

public class GoogleAuthService : IGoogleAuthService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<GoogleAuthService> _logger;

    public GoogleAuthService(IConfiguration configuration, ILogger<GoogleAuthService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<GoogleJsonWebSignaturePayload?> VerifyGoogleTokenAsync(string idToken)
    {
        try
        {
            var clientId = _configuration.GetValue<string>("Oauth2:Google:ClientId");
            
            var settings = new GoogleJsonWebSignature.ValidationSettings();
            if (!string.IsNullOrEmpty(clientId))
            {
                settings.Audience = new List<string> { clientId };
            }
            
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
            if (payload == null) return null;

            return new GoogleJsonWebSignaturePayload
            {
                Email = payload.Email,
                GivenName = payload.GivenName ?? string.Empty,
                FamilyName = payload.FamilyName ?? string.Empty,
                Picture = payload.Picture ?? string.Empty,
                Subject = payload.Subject
            };
        }
        catch (InvalidJwtException ex)
        {
            _logger.LogError(ex, "Invalid Google ID token.");
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying Google ID token.");
            return null;
        }
    }
}
