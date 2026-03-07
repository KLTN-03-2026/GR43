namespace DoAnTotNghiep.Domain.Users;

public interface IUserRepository
{
    Task Create(Users user);
    Task<Users?> GetByEmail(string email);
}
