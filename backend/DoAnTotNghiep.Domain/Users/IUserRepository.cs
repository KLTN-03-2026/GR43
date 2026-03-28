namespace DoAnTotNghiep.Domain.Users;

public interface IUserRepository
{
    Task CreateAccount(UserAccount user);
    Task<UserAccount?> GetByEmail(string email);
    Task<UserAccount?> ResetPassword(String newHashedPassword, String email);
    // JWT specific methods
    Task<UserAccount> GetByRefreshToken(string refreshToken);
    Task Create(UserAccount user);
    Task UpdateAsync(UserAccount user);
}
