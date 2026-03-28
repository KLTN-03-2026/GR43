namespace DoAnTotNghiep.Domain.Users;

public interface IUserRepository
{
    Task CreateAccount(UserAccount user);
    Task<UserAccount?> GetByEmail(string email);
    Task<UserAccount?> ResetPassword(String newHashedPassword, String email);
    // Task<UserAccount?> GetAccountByEmail(string email);
    // Task<UserAccount?> ForgotPasswordByEmail(string email);
}
