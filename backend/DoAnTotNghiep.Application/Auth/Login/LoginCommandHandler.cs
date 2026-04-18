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

            var session = new Session(
                user.Id,
                request.DeviceId,
                request.IPAddress,
                request.Platform,
                request.PushToken,
                refreshToken
            );
            await _sessionRepo.CreateSession(session);
            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token
            };
        }
    }
}