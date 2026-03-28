using MongoDB.Driver;
using DoAnTotNghiep.Domain.Users;
using DoAnTotNghiep.Infrastructure.Persistence;

namespace DoAnTotNghiep.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<UserAccount> _users;

    public UserRepository(MongoDbContext context)
    {
        _users = context.UserAccounts;
    }

    public async Task CreateAccount(UserAccount user)
    {
        await _users.InsertOneAsync(user);
    }

    public async Task<UserAccount?> GetByEmail(string email)
    {
        return await _users
            .Find(x => x.Email == email)
            .FirstOrDefaultAsync();
    }
    
    public async Task<UserAccount?> ResetPassword(String newHashedPassword, String email)
    {
        var filter = Builders<UserAccount>.Filter.Eq(x => x.Email, email);
        var update = Builders<UserAccount>.Update.Set(x => x.HashPassword, newHashedPassword);
        var options = new FindOneAndUpdateOptions<UserAccount>()
        {
            ReturnDocument = ReturnDocument.Before
        };
        var response = await _users.FindOneAndUpdateAsync(filter, update, options);
        return response;
    }
}