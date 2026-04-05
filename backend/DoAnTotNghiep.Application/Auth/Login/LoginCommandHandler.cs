using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Domain.Users;
using MediatR;

namespace DoAnTotNghiep.Application.Users.Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResponse>
    {
        private readonly IUserRepository _repo;
        private readonly ISessionRepository _sessionRepo;
        private readonly IJwtService _jwt;
        private readonly IPasswordHasher _hasher;

        public LoginCommandHandler(IUserRepository repo, ISessionRepository sessionRepo, IJwtService jwt, IPasswordHasher hasher)
        {
            _repo = repo;
            _sessionRepo = sessionRepo;
            _jwt = jwt;
            _hasher = hasher;
        }

        public async Task<AuthResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await _repo.GetByEmail(request.Email);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            if (!_hasher.Verify(request.Password, user.HashPassword))
            {
                throw new ConflictException("Invalid password");
            }

            var accessToken = _jwt.GenerateAccessToken(user);
            var refreshToken = _jwt.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);
            var deviceId = request.DeviceId;
            var platform = request.Platform;
            var ipAddress = request.IPAddress;
            var fcmToken = request.PushToken;
            var session = new Session(user.Id, deviceId, ipAddress, platform, fcmToken)
            {
                IsRevoked = false
            };
            await _sessionRepo.CreateSession(session);
            await _repo.UpdateAsync(user);
            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token
            };
        }
    }
}