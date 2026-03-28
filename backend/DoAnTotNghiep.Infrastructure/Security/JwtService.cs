using DoAnTotNghiep.Application.Common;
using DoAnTotNghiep.Domain.Users;
using DoAnTotNghiep.Infrastructure.Persistence;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace DoAnTotNghiep.Infrastructure.Security
{
    public class JwtService : IJwtService
    { 
        private const int EXPIRE_TIME = 3 ; 
        private readonly string _secretKey;
        public JwtService(IOptions<KeySettings> keySettings)
        {
            _secretKey = keySettings.Value.SecretKey;
        }
        public string GenerateAccessToken(UserAccount user)
        {
            var claims = new[]
            {
                new Claim("UserId", user.Id.ToString()),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(EXPIRE_TIME),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public RefreshToken GenerateRefreshToken()
        {
            var randomBytes = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomBytes),
                ExpireDate = DateTime.Now.AddDays(EXPIRE_TIME * 2)
            };
        }
    }
}
