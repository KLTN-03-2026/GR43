using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DoAnTotNghiep.Application.Exception;

namespace DoAnTotNghiep.Application.Users.Commands.Login
{
    public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, AuthResponse>
    {
        private readonly IUserRepository _repo;
        private readonly IJwtService _jwt;
        private readonly ISessionRepository _sessionRepo;

        public RefreshTokenHandler(IUserRepository repo, IJwtService jwt, ISessionRepository sessionRepo) 
        {
            _repo = repo;
            _jwt = jwt;
            _sessionRepo = sessionRepo;
        }
        public async Task<AuthResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var session = await _sessionRepo.GetByRefreshToken(request.RefreshToken);
            if (session == null)
            {
                throw new UnauthorizedException("Invalid refresh token");
            }
            if (!session.RefreshToken.IsActive)
            {
                throw new UnauthorizedException("Refresh token is not active");
            }
            var user = await _repo.GetByIdAsync(session.UserId);
            if(user == null)
            {
                throw new UnauthorizedException("User not found");
            }
            session.RefreshToken.Revoke();
            var newAccessToken = _jwt.GenerateAccessToken(user);
            var newRefreshToken = _jwt.GenerateRefreshToken();
            return new AuthResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken.Token
            };
        }
    }
}
