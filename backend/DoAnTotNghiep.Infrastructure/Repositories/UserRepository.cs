using MongoDB.Driver;
using DoAnTotNghiep.Domain.Users;
using DoAnTotNghiep.Infrastructure.Persistence;

namespace DoAnTotNghiep.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<Users> _users;

    public UserRepository(MongoDbContext context)
    {
        _users = context.Users;
    }

    public async Task Create(Users user)
    {
        await _users.Indexes.CreateOneAsync(
            new CreateIndexModel<Users>(
                Builders<Users>.IndexKeys.Ascending(x => x.Email),
                new CreateIndexOptions { Unique = true }
            )
        );
    }

    public async Task<Users?> GetByEmail(string email)
    {
        return await _users
            .Find(x => x.Email == email)
            .FirstOrDefaultAsync();
    }
}