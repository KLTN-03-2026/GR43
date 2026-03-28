using System.Security.Cryptography;
using System.Text;
using DoAnTotNghiep.Domain.Token;

namespace DoAnTotNghiep.Infrastructure.Security
{
    public class TokenGenerateService : ITokenGenerator
    {
        private const string ALPHANUMBERICCHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        public string GenerateToken()
        {
            var length = 6;
            var result = new StringBuilder(length);

            for (int i = 0; i < length; i++)
            {
                var randomByte = RandomNumberGenerator.GetInt32(0, ALPHANUMBERICCHARS.Length);
                result.Append(ALPHANUMBERICCHARS[randomByte]);
            }

            return result.ToString();
        }
    }
}