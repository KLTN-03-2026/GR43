using System;
using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Application.Exception;
using DoAnTotNghiep.Domain.Users;
using MediatR;

namespace DoAnTotNghiep.Application.Users.Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResponse>
    {
        private readonly IUserRepository _repo;
        private readonly IJwtService _jwt;
        private readonly IPasswordHasher _hasher;

        public LoginCommandHandler(IUserRepository repo, IJwtService jwt, IPasswordHasher hasher)
        {
            _repo = repo;
            _jwt = jwt;
            _hasher = hasher;
        }
        public async Task<AuthResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = _repo.GetByEmail(request.Email).Result;
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            if(!_hasher.Verify(user.HashPassword, request.Password))
            {
                throw new ConflictException("Invalid password");
            }
            var accessToken = _jwt.GenerateAccessToken(user);
            var refreshToken = _jwt.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);
            await _repo.UpdateAsync(user);
            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token
            };
        }
    }
}
