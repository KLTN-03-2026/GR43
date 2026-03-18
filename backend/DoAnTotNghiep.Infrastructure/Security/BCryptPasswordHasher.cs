using DoAnTotNghiep.Application.Common;

namespace DoAnTotNghiep.Infrastructure.Security;

using BCrypt.Net;

public class BCryptPasswordHasher : IPasswordHasher
{
    public string Hash(string password)
    {
        return BCrypt.HashPassword(password);
    }

    public bool Verify(string password, string hash)
    {
        return BCrypt.Verify(password, hash);
    }
}