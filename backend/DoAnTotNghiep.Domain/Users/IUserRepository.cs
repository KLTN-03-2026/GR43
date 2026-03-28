namespace DoAnTotNghiep.Domain.Users;

public interface IUserRepository
{
    Task<User> GetByRefreshToken(string refreshToken);
    Task Create(User user);
    Task UpdateAsync(User user);
    Task<User?> GetByEmail(string email);
}
