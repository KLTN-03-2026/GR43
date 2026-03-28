using DoAnTotNghiep.Domain.Users;

namespace DoAnTotNghiep.Application.Common;

public interface IJwtService
{
    string GenerateAccessToken(UserAccount user);
    RefreshToken GenerateRefreshToken();
}