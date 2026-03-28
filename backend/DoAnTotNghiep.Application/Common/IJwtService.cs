using DoAnTotNghiep.Domain.Users;

namespace DoAnTotNghiep.Application.Common;

public interface IJwtService
{
    string GenerateAccessToken(User user);
    RefreshToken GenerateRefreshToken();
}