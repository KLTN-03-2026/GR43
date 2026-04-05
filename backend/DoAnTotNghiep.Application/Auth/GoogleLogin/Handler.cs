using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Application.Users.Commands.Login;
using DoAnTotNghiep.Domain.Enum;
using DoAnTotNghiep.Domain.Users;
using MediatR;

namespace DoAnTotNghiep.Application.Auth.GoogleLogin;

public class GoogleLoginHandler : IRequestHandler<GoogleLoginCommand, AuthResponse>
{
    private readonly IGoogleAuthService _googleAuthService;
    private readonly IUserRepository _userRepository;
    private readonly IJwtService _jwtService;

    public GoogleLoginHandler(IGoogleAuthService googleAuthService, IUserRepository userRepository, IJwtService jwtService)
    {
        _googleAuthService = googleAuthService;
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<AuthResponse> Handle(GoogleLoginCommand request, CancellationToken cancellationToken)
    {
        var payload = await _googleAuthService.VerifyGoogleTokenAsync(request.IdToken);
        if (payload == null)
            throw new UnauthorizedException("Invalid Google token");

        var user = await _userRepository.GetByEmail(payload.Email);

        if (user == null)
        {
            var username = payload.Email.Split('@')[0];
            user = new UserAccount(
                username: username,
                email: payload.Email,
                hashPassword: null,
                provider: AuthProvider.Google,
                providerId: payload.Subject
            );
            user.MarkAsVerified();
            await _userRepository.CreateAccount(user);
        }
        else
        {
            if (user.Provider != AuthProvider.Google)
            {
                throw new ConflictException("User already exists with a different provider");
            }
        }

        var accessToken = _jwtService.GenerateAccessToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken();

        user.RefreshTokens.Add(refreshToken);
        await _userRepository.UpdateAsync(user);

        return new AuthResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token
        };
    }
}
