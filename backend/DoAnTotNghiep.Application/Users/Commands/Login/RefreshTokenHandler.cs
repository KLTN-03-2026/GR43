using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnTotNghiep.Application.Users.Commands.Login
{
    public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, AuthResponse>
    {
        private readonly IUserRepository _repo;
        private readonly IJwtService _jwt;

        public RefreshTokenHandler(IUserRepository repo, IJwtService jwt) 
        {
            _repo = repo;
            _jwt = jwt;
        }
        public async Task<AuthResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var user = await _repo.GetByRefreshToken(request.RefreshToken);
            var token = user.RefreshTokens.FirstOrDefault(x => x.Token == request.RefreshToken);
            if (token == null || !token.IsActive)
            {
                throw new System.Exception("Invalid refresh token");
            }
            token.IsRevoked = true;
            var newAccessToken = _jwt.GenerateAccessToken(user);
            var newRefreshToken = _jwt.GenerateRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            await _repo.UpdateAsync(user);
            return new AuthResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken.Token
            };
        }
    }
}
